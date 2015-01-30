define(['config', 'angular', 'jQuery', 'lodash'], function (config, angular, $, _) {
    'use strict';

    var debug = config.debug;

    /* <main-menu />
    app.directive('mainMenu', [function () {
        console.log("<main-menu /> defined.");
        return {
            restrict: 'E',
            templateUrl: '/app/directives/mainMenu.html',
            scope: { 'client': '=' }
        }
    }]); */

    var directives = angular.module('directives', []);

    directives.directive('viewingArea', [function () {
        debug.log("<viewing-area /> defined.");
        return {
            restrict: 'E',
            templateUrl: 'directives/viewingArea.html',
            controller: ["$scope", function ($scope) {
                $scope.getAvailableLicenses = function (total, issued) {
                    return total-issued;
                };

                $scope.getPercentageUsed = function (licenseInfo, width) {
                    var percentage = ((licenseInfo.TotalLicenses - licenseInfo.UsedLicenses) / licenseInfo.TotalLicenses);
                    return { 'width': percentage*width + 'px' };
                };
            }],
            scope: {
                type: "@",
                packages: "="
            }
        };
    }]);

    directives.directive('card', [function () {
        debug.log("<card /> defined.");
        return {
            restrict: 'E',
            templateUrl: 'directives/card.html',
            controller: ["$scope", function ($scope) {
                if ($scope.data === undefined) {
                    debug.error("Card was passed NULL object.");
                }

                switch ($scope.type) {
                    case "lineup":
                        $scope.leftColTitle1 = "Packages";
                        $scope.rightTitleCol1 = "Groups";
                        $scope.rightTitleCol2 = "Subscribers";
                        $scope.total = $scope.data.TotalUsers;
                        break;
                    case "group":
                        $scope.leftColTitle1 = "Issued Lineups";
                        $scope.rightTitleCol1 = "Subscribers";
                        $scope.rightTitleCol2 = "Total";
                        $scope.total = $scope.data.NumberOfUsers;
                        break;
                }

                $scope.getAvailableLicenses = function (packages) {
                    var availableLicenses = 0;
                    _.forEach(packages, function (twcPackage) {
                        var licenseInfo = twcPackage.LicenseInfo;
                        availableLicenses += licenseInfo.TotalLicenses - licenseInfo.UsedLicenses;
                    });
                    return availableLicenses;
                }

                $scope.isType = function(type) {
                    return $scope.type === type;
                };

                $scope.getMiddleStyle = function() {
                    var dataLength = 0;
                    if ($scope.type === 'lineup') {
                        if ($scope.data.Groups !== undefined) {
                            dataLength = $scope.data.Groups.length;
                        } else {
                            debug.error("card.getMiddleStyle: There are no groups for this lineup.");//" + $scope.data.Data.Value);
                        }
                    } else {
                        dataLength = $scope.data.LightGroups.length;
                    }
                    return { 'overflow-y': (dataLength > 6 ? 'scroll' : 'none') };
                };

//                $scope.getTotalUserStyle = function() {
//                    var dataLength = 0;
//                    if ($scope.type === 'lineup') {
//                        if ($scope.data.Groups !== undefined) {
//                            dataLength = $scope.data.Groups.length;
//                        } else {
//                            debug.error("card.getTotalUserStyle: " + $scope.data.Data.Value);
//                        }
//                    } else {
//                        dataLength = $scope.data.LightGroups.length;
//                    }
//                    return { "width": "100%"
//                           , "text-align": "right"
//                           , "padding-right": (dataLength > 5 ? '14px' : '31px')
//                    };
//                };

                $scope.totalUsers = function() {
                    var total = 0;
                    var array = 0;
                    if ($scope.type === 'lineup') {
                        array = $scope.data.Groups;
                    } else {
                        array = $scope.data.LightGroups;
                    }
                    _.forEach(array, function(item) {
                       total += item.NumberOfSubscribers;
                    });
                    return total;
                };

                $scope.showTotal = function () {
                    var dataLength = 0;
                    if ($scope.type === 'lineup') {
                        if ($scope.data.Groups !== undefined) {
                            dataLength = $scope.data.Groups.length;
                        } else {
                            debug.error("card.showTotal: " + $scope.data.Data.Value);
                        }
                    } else {
                        dataLength = $scope.data.LightGroups.length;
                    }

                    if (dataLength > 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };

            }],
            scope: {
                index: "@",
                type: "@",
                data: "=",
                onEdit: "&",
                onDelete: "&"
            }
        };
    }]);

    directives.directive('dialog', function factory() {
        return {
            transclude: true,
            scope: {
                dialogTitle: '@title',
                dialogOk: '@ok',
                dialogCancel: '@cancel',
                onOk: '&',
                onCancel: '&',
                visible: '='
            },
            templateUrl: 'directives/dialog.html',
            restrict: 'E',
            replace: true
        };
    });

    directives.directive('tooltip', function () {
        return {
            restrict:'A',
            link: function(scope, element, attrs)
            {
                $(element)
                    .attr('title',scope.$eval(attrs.tooltip))
                    .attr('data-container', 'body')
                    .tooltip();
            }
        };
    });

    directives.directive('wizard', ['$sce', function ($sce) {
        return {
            transclude: true,
            scope: {
                steps: '=steps',
                clearValidation: '=',
                wizardTitle: '@heading',
                onSubmit: '&',
                onCancel: '&',
                visible: '=',
                width: '=width',
                height: '=height'
            },
            templateUrl: 'directives/wizard.html',
            controller: ['$rootScope', '$scope', function ($rootScope, $scope) {

                var searchMatch = function (haystack, needle) {
                    if (!needle) {
                        return true;
                    }
                    // ignore properties that aren't a string
                    try {
                        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
                    } catch (e) {
                        return false;
                    }
                };

                $scope.search = function () {
//                    $scope.filteredUsers = $filter('filter')($scope.users, function (user) {
//                        var keys = Object.keys(user);
//                        var i = 0;
//                        for (i; i < keys.length; i++) {
//                            var currentKey = keys[i];
//                            if (searchMatch(user[currentKey], $scope.query)){
//                                return true;
//                            }
//                        }
//                        return false;
//                    });
//                    // take care of the sorting order
//                    if ($scope.sortOrder !== '') {
//                        $scope.filteredUsers = $filter('orderBy')($scope.filteredUsers, $scope.sortOrder, $scope.reverse);
//                    }
//                    $scope.currentPage = 0;
                    // now group by pages
//                    $scope.groupToPages();
                };

                $scope.getDialogStyle = function () {
                    var newWidth = 800;
                    var newHeight = 600;
                    if ($scope.width && $scope.width > 0) { newWidth = $scope.width; }
                    if ($scope.height && $scope.height > 0) { newHeight = $scope.height; }
                    return { width: newWidth + "px",
                             height: newHeight + "px"
                    };
                };
                $scope.getDialogBodyStyle = function () {
                    var newWidth = 800-22; // -22 for inner padding
                    var newHeight = 600-239; // -239 for heading/sub/footer
                    if ($scope.width && $scope.width > 0) { newWidth = $scope.width - 22; }
                    if ($scope.height && $scope.height > 0) { newHeight = $scope.height - 239; }
                    return { width: newWidth + "px",
                        height: newHeight + "px",
                        "overflow-y": "scroll"
                    };
                };
                $scope.getStepClass = function (step) {
                    return $scope.isCurrentStep(step) ? 'stepsSelected':'stepsNormal';
                };
                $scope.getStepStyle = function (step) {
                    var zIndex = $scope.steps.length-step;
                    var left = 28*step;
                    if (step === 0) {
                        return { "z-index": zIndex };
                    } else {
                        return { "z-index": zIndex,
                                 "position": "relative",
                                 "left": "-" + left + "px"
                        };
                    }

                };
                $scope.getStepTitleStyle = function (step) {
                    var top = "20px";
                    var left = "5px";
                    if (step.title.length > 10) {
                        top = "10px";
                        left = "2px";
                    }
                    return { "position": "relative",
                        "top": top,
                        "left": left
                    };
                };
                $scope.isCurrentStep = function (step) {
//                    return $scope.step === step;
                    return $scope.$parent.step === step;
                };
                $scope.isSearchable = function () {
//                    return $scope.steps[$scope.step].search;
                    return $scope.steps[$scope.$parent.step].search;
                }

//                $scope.getCurrentStep = function() {
//                    debug.log("getCurrentStep: " + $scope.steps[$scope.step].title);
//                    return $scope.steps[$scope.step].title;
//                };
                $scope.isLastStep = function() {
//                    return $scope.step === ($scope.steps.length - 1);
                    return $scope.$parent.step === ($scope.steps.length - 1);
                };
                $scope.getNextLabel = function() {
                    if ($scope.isLastStep()) {
                        $("#nextButton").removeClass("btn-primary").addClass("btn-success");
                    }
                    return ($scope.isLastStep()) ? 'Save' : 'Next';
                };
                $scope.isStepValid = function() {
                    var currentStep = $scope.$parent.step;
                    var isValid = true;
                    if ($scope.$parent.steps[currentStep].validation !== undefined) {
                        isValid = $scope.$parent.steps[currentStep].validation();
                        debug.log("validation was called, and returned: " + isValid.toString());
                    }
                    return isValid;
                };
                $scope.setCurrentStep = function(step) {
                    if ($scope.isStepValid()) {
                        $scope.$parent.step = step;

                        if($scope.isLastStep()) {
                            $("#nextButton").removeClass("btn-primary").addClass("btn-success");
                        } else {
                            $("#nextButton").removeClass("btn-success").addClass("btn-primary");
                        }
                    }
                };
                $scope.isFirstStep = function() {
//                    return $scope.step === 0;
                    return $scope.$parent.step === 0;
                };


                $scope.handlePrevious = function() {
                    if ($scope.isLastStep()) {
                        $("#nextButton").removeClass("btn-success").addClass("btn-primary");
                    }
                    $scope.$parent.step -= ($scope.isFirstStep()) ? 0 : 1;
//                    $scope.step -= ($scope.isFirstStep()) ? 0 : 1;
//                    $scope.$parent.step = $scope.step;
                };
                $scope.getHeaderText = function() {
//                    return $scope.steps[$scope.step].header;
                    return $scope.steps[$scope.$parent.step].header;
                };
                $scope.handleNext = function() {
                    if($scope.isLastStep()) {
                        $("#nextButton").removeClass("btn-success").addClass("btn-primary");
                        $scope.onSubmit();
                    } else {
                        $scope.$parent.step += 1;
//                        $scope.step += 1;
//                        $scope.$parent.step = $scope.step;
                    }
                };
                $scope.handleCancel = function () {
//                    $scope.step = 0;
                    $scope.$parent.step = 0;
                    $scope.onCancel();
                };
                $scope.wrapText = function (text) {
                    if (text.length > 10) {
                       return $sce.trustAsHtml(text.replace(" ", "<br/>"));
                    } else {
                       return text;
                    }
                };
            }],
            restrict: 'E',
            replace: true
        };
    }]);

    directives.directive('dropdownToggle', ['$document', '$location', function ($document, $location) {
        var openElement = null,
            closeMenu   = angular.noop;
        return {
            restrict: 'CA',
            link: function(scope, element, attrs) {
                scope.$watch('$location.path', function() { closeMenu(); });
                element.parent().bind('click', function() { closeMenu(); });
                element.bind('click', function (event) {

                    var elementWasOpen = (element === openElement);

                    event.preventDefault();
                    event.stopPropagation();

                    if (!!openElement) {
                        closeMenu();
                    }

                    if (!elementWasOpen && !element.hasClass('disabled') && !element.prop('disabled')) {
                        element.parent().addClass('open');
                        openElement = element;
                        closeMenu = function (event) {
                            if (event) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                            $document.unbind('click', closeMenu);
                            element.parent().removeClass('open');
                            closeMenu = angular.noop;
                            openElement = null;
                        };
                        $document.bind('click', closeMenu);
                    }
                });
            }
        };
    }]);
});