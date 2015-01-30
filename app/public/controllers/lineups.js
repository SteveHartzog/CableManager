define(['angular', 'lodash', 'config', 'controllers/controllers', 'jQuery', 'services.utils', 'dataContext', 'services/services'],
    function (angular, _, config, controllers, $, utils, dc) {
        'use strict';

        var debug = config.debug;
        var toasts = config.messages;
        var errors = config.errors;
        var toastr = config.toastr;

        controllers.controller('lineups', ['security', '$q', '$rootScope', '$scope', function (security, $q, $rootScope, $scope) {
            debug.log('[controller.lineups] running.');

            $scope.viewingAreaArray = [];
            $scope.allLineups = [];
            $scope.isLoaded = false;
            $scope.allCustomerPackages = [];

            $scope.getSelectedCustomerPackageNames = function() {
                var packageText = "";
                if ($scope.selectedLineup.Packages.length > 0) {
                    packageText = _.pluck($scope.selectedLineup.Packages, 'PackageName').join(', ');
                }
                return packageText;
            }

            // cascading radio buttons
            $scope.getBasicCustomerPackages = function () {
                var filteredPackages = [];
                switch ($scope.selectedLineup.ViewingArea) {
                    case "Private":
                        filteredPackages = $scope.allCustomerPackages.privatePackages;
                        break;
                    case "Public":
                        filteredPackages = $scope.allCustomerPackages.publicPackages;
                        break;
                    case "Common":
                        filteredPackages = $scope.allCustomerPackages.commonPackages;
                        break;
                }
                filteredPackages = _.filter(filteredPackages, { 'PackageType': 'bst' });
                return filteredPackages;
            };

            $scope.$watch('selectedLineup.ViewingArea', function () {
                // get All services so we can build the radio buttons
                if ($scope.isNew) {
                    if ($scope.selectedLineup !== undefined || $scope.selectedLineup === null) {

                        // hide & unset previous package and channel selections
                        $scope.customerChannels = [];
                        $scope.selectedLineup.Channels = [];
                        $scope.selectedLineup.Packages = [];
                        $scope.selectedLineup.basicPackageId = 0;
                        $scope.selectedLineup.corePackageId = 0;
                        $scope.corePackages = [];
                        $scope.addOnPackages = [];
                        $scope.showCorePackages = false;
                        $scope.showAddOnPackages = false;

                        $scope.basicPackages = $scope.getBasicCustomerPackages();
                        $scope.showBasicPackages = true;
                        $scope.steps[0].isValid = false;
                    }
                }
            });
            $scope.$watch('selectedLineup.basicPackageId', function (customerPackageId) {
                if (customerPackageId !== undefined && customerPackageId > 0) {
                    // rehydrate customerPackage
                    var basicPackage = _.filter($scope.basicPackages, { 'PackageId': customerPackageId })[0];
                    debug.log("BST: " + basicPackage.PackageName + " selected.");

                    // reset channels list
                    $scope.customerChannels = [];
                    $scope.selectedLineup.Channels = [];
                    $scope.selectedLineup.Packages = [];
                    $scope.selectedLineup.corePackageId = 0;
                    $scope.corePackages = [];
                    $scope.addOnPackages = [];
                    $scope.showAddOnPackages = false;

                    // Add Basic package channels to channel list
                    updateSelectedPackages('add', basicPackage);

                    //update corePackageList
                    $scope.corePackages = basicPackage.Children;

                    $scope.showCorePackages = true;
                    $scope.steps[0].isValid = false;
                }
            });
            $scope.$watch('selectedLineup.corePackageId', function (customerPackageId) {
                if (customerPackageId !== undefined && customerPackageId > 0) {
                    // remove previous corePackage from selectedPackages
                    var prevCorePackage = _.filter($scope.selectedLineup.Packages, { 'PackageType': 'core' })[0];
                    if (prevCorePackage !== undefined) {
                        // remove previous corePackage customerChannels from the channels list
                        $scope.customerChannels = _.reject($scope.customerChannels, function (customerChannel) {
                            return (customerChannel.PartOfPackageId === prevCorePackage.PackageId);
                        });

                        // remove previous selections from previous core package customerChannels
                        $scope.selectedLineup.Channels = _.reject($scope.selectedLineup.Channels, function (customerChannel) {
                            return (customerChannel.PartOfPackageId === prevCorePackage.PackageId);
                        });
                    }

                    // hydrate the new 'core' customerPackage
                    var corePackage = _.filter($scope.corePackages, { 'PackageId': customerPackageId })[0];
                    debug.log("Core: " + corePackage.PackageName + " selected.");

                    // remove corePackages from the selectedPackages, and save the old CorePackage
                    $scope.selectedLineup.Packages = _.reject($scope.selectedLineup.Packages, { 'PackageType': 'core' });

                    // Add get previous base and core CustomerPackages
//                    updateSelectedPackages('add', basicPackage);
                    updateSelectedPackages('add', corePackage);

                    //update addOnPackageList
                    $scope.addOnPackages = [];
                    $scope.addOnPackages = corePackage.Children;

                    $scope.showAddOnPackages = true;

                    // Now that CustomerPackage selection requirements have been met, allow user to continue
                    $scope.steps[0].isValid = true;
                }
            });
            $scope.onClickAddOnCustomerPackage = function ($event, customerPackage) {
                debug.log("AddOn: " + customerPackage.PackageName + " selected.");

                var checkbox = $event.target;
                var action = (checkbox.checked ? 'add' : 'remove');
                updateSelectedPackages(action, customerPackage);

            };
            $scope.isSelectedPackage = function (packageId) {
                var found = _.filter($scope.selectedLineup.Packages, { 'PackageId': packageId });
                return (found.length > 0);
            };

            // updates $scope.selectedLineup.Packages & $scope.customerChannels
            var updateSelectedPackages = function (action, customerPackage) {
                    if (action === 'add') {
                        $scope.selectedLineup.Packages.push(customerPackage);

                        getPackageChannels(customerPackage.PackageId).then(function (data) {
                            $scope.customerChannels = _.union($scope.customerChannels, data);
                        }, function (error) {
                            utils.handleError({
                                error: error,
                                security: security,
                                dataContext: dc
                            });
                        });
                    }
                    if (action === 'remove') {
                        // remove this CustomerPackage
                        $scope.selectedLineup.Packages = _.reject($scope.selectedLineup.Packages,
                            function (thisPackage) { return thisPackage.PackageId === customerPackage.PackageId
//                            var foundPackage = _.filter(thisPackage, { 'PackageId': customerPackage.PackageId });
//                            return (foundPackage.length > 0);
                            }
                        );

                        // Remove any channel selections for any channels in this package
                        var channelsToRemove = _.filter($scope.customerChannels, function (customerChannel) { return customerChannel.PartOfPackageId === customerPackage.PackageId });
                        var removeChannels = _.pluck(channelsToRemove, 'Channel');
                        var removeChannelIds = _.pluck(removeChannels, 'ChannelId');
                        // then remove those channel selections from the selected CustomerChannels
                        $scope.selectedLineup.Channels = _.reject($scope.selectedLineup.Channels, function (channel) {
                            // TODO: If this is a multi-packageChannel, then just remove the PackageName from the PartOfPackageName
                            return _.contains(removeChannelIds, channel.ChannelId);
                        });

                        // Remove this packages channels from the CustomerChannels list
                        $scope.customerChannels = _.reject($scope.customerChannels, function (channel) { return channel.PartOfPackageId === customerPackage.PackageId })

                    }
            }
            $scope.getPackageName = function (customerPackage) {
                if (customerPackage.MultiPackageName !== undefined && customerPackage.MultiPackageName.length > 0) {
                    return customerPackage.MultiPackageName;
                } else {
                    return customerPackage.PartOfPackageName;
                }
            }

            $scope.isLineupChannel = function (channelId) {
                var found = false;
                if ($scope.selectedLineup.Channels.length > 0) {
                    var foundChannel = _.filter($scope.selectedLineup.Channels, { 'ServiceId': channelId });
                    found = foundChannel.length > 0;
                }
                return found;
            };

            // Channel Sort
            $scope.sortOrder = 'Channel.ChannelName';
            $scope.sortBy = function(table, newSortingOrder) {
                var sortClass = newSortingOrder.replace('.', '_');
                if ($scope.sortOrder === newSortingOrder){
                    $scope.reverse = !$scope.reverse;
                }
                $scope.sortOrder = newSortingOrder;

                // icon setup
                $('#table' + table + ' th i').each(function(){
                    // icon reset
                    $(this).removeClass().addClass('icon-sort');
                });
                if ($scope.reverse){
                    $('#table' + table + ' th.'+sortClass+' i').removeClass().addClass('icon-chevron-up');
                }else{
                    $('#table' + table + ' th.'+sortClass+' i').removeClass().addClass('icon-chevron-down');
                }
            };

            // RemovePopOver
            $scope.showRemovePopOver = false;
            $scope.openRemovePopOver = function (currentCard, lineupId) {
                $scope.selectedLineupId = lineupId;
                var postCard = document.getElementById(currentCard);
                debug.log("postCard", currentCard);
                var currTop = postCard.offsetTop + 4;
                var currLeft = postCard.offsetLeft + 4;
                debug.log("openRemovePopOver(" + currentCard + "') @ top: " + currTop + "px, left: " + currLeft + "px");
                $("#RemovePopOver").css("top", currTop + "px")
                    .css("left", currLeft + "px")
                    .css("z-index", "1000")
                    .css("display", "block");
                $scope.showRemovePopOver = true;
            };
            $scope.hideRemovePopOver = function() {
                $scope.selectedLineupId = null;
                $scope.showRemovePopOver = false;
            };
            $scope.removeLineup = function() {
                $.when(dc.lineups.deleteById($scope.selectedLineupId)).done(function () {
                    // get lineup object
                    var lineup = _.filter($scope.allLineups, { 'LineupId' : $scope.selectedLineupId });
                    var lineupName = lineup[0].LineupName;
                    var index;
                    if (lineup.length > 0) {
                        $scope.$apply(function () {
                            index = $scope.allLineups.indexOf(lineup[0]);
                            $scope.allLineups.splice(index, 1);
                            $scope.hideRemovePopOver();
                            toastr.warning(lineupName + " deleted.");
                        });
                    } else {
                        $scope.hideRemovePopOver();
                    }

                }).fail(function (error) {
                    $scope.hideRemovePopOver();
                    utils.handleError({
                        error: error,
                        security: security,
                        dataContext: dc
                    });
                });
            };

            // Channel CheckBoxes
            $scope.customerChannels = [];
            $scope.isLineupChannel = function (channelId) {
                var found = false;
                if ($scope.selectedLineup.Channels && $scope.selectedLineup.Channels.length > 0) {
                    var channels = _.pluck($scope.selectedLineup.Channels, 'Channel');
                    var foundChannel = _.filter(channels, { 'ChannelId': channelId});
                    found = foundChannel.length > 0;
                }
                return found;
            };
            $scope.addChannelToLineup = function (customerChannel, isAdd) {
                if (isAdd) {
                    $scope.selectedLineup.Channels.push(customerChannel);
                } else {
                    var foundCustomerChannel = _.filter($scope.selectedLineup.Channels, function (customerChannel) {
                        return (customerChannel.Channel.ChannelId === customerChannel.Channel.ChannelId)
                    });
                    // if not found, no need to remove
                    var index = -1;
                    if (foundCustomerChannel.length > 0) {
                        index = $scope.selectedLineup.Channels.indexOf(foundCustomerChannel[0]);
                        // splice channel from array
                        if (index !== -1) {
                            $scope.selectedLineup.Channels.splice(index, 1);
                        }
                    }
                }
            };
            $scope.checkChannels = false;

            $scope.getTotalUsers = function(lineup) {
                var total = 0;
                for (var i =0; i < lineup.Groups.length; i++) {
                    total += lineup.Groups[i].NumberOfUsers;
                }
                return total;
            };

            $scope.filterByPackage = function (array) {
                var filteredArray = _.filter(array, { 'ServiceId': $scope.selectedLineup.ServiceId });
                return filteredArray;
            };

            // Wizard
            $scope.showLineupWizard = false;
            $scope.openLineupWizard = function (lineup) {
                if (!$scope.showRemovePopOver)
                {
                    $('body').addClass('stop-scrolling');
                    $scope.isNew = false;

                    $scope.selectedLineup = angular.copy(lineup);
                    $scope.showBasicPackages = false; // why was this showing?
                    $scope.selectedLineup.PackageText = _.pluck($scope.selectedLineup.Packages, 'PackageName').join(', ');
                    $scope.customerChannels = [];
                    if ($scope.selectedLineup.Channels === null || $scope.selectedLineup.Channels === undefined) {
                        $scope.selectedLineup.Channels = [];
                    }
//                    $scope.selectedLineup.TotalUsers = $scope.getTotalUsers(lineup);
                    // Save packages to rootscope so even if they are emptied somehow (WTF?) I have it.
//                    $rootScope.selectedLineupPackages = $scope.selectedLineup.Packages;
                    if ($scope.selectedLineup.Packages.length > 0){
                        _.forEach($scope.selectedLineup.Packages, function (channelPackage) {
                            getPackageChannels(channelPackage.PackageId).then(function (data) {
                                $scope.customerChannels = _.union($scope.customerChannels, data);
                            });
                        });
//                        getLineupChannels(lineup.LineupId).then(function (data) {
//                            $scope.selectedLineup.Channels = data;
//                        });
                    }
                    // disable channels that do not have enough Licenses to add to this Lineup
                    // TODO: Readd feature to prevent oversubscribing
//                    $scope.disableChannelsThatDoNotHaveEnoughLicense();
                    $scope.dialogTitle = $scope.selectedLineup.LineupName;
                    $scope.showLineupWizard = true;
                } else {
                    debug.log("openLineupWizard requested, but removePopOver already open!");
                    toastr.warn("Please complete the delete action first.");
                }
            };
            $scope.openNewLineupWizard = function () {
                if (!$scope.showRemovePopOver) {
                    // enable validation
                    $scope.clearValidation = false;
                    $scope.steps[0].isValid = false;

                    $scope.selectedLineup = {};
                    $scope.selectedLineup.Channels = [];
                    $scope.selectedLineup.Packages = [];
                    $scope.customerChannels = [];
                    $('body').addClass('stop-scrolling');
                    $scope.isNew = true;
                    $scope.dialogTitle = "Add Lineup";
                    $scope.showLineupWizard = true;
                } else {
                    debug.log("openNewLineup9Wizard requested, but removePopOver already open!");
                    toastr.warn("Please complete the delete action first.");
                }
            };
            $scope.hideLineupWizard = function () {
                $('body').removeClass('stop-scrolling');
                $scope.step = 0;
                $scope.showLineupWizard = false;
            };
            $scope.saveLineup = function () {
               // disable wizard save button as soon as possible to prevent double submits
               $("#nextButton").prop('disabled', true);
                // TODO: Show saving progressbar
                if ($scope.isNew) {
                    $.when(dc.lineups.addData($scope.selectedLineup)).done(function (lineup) {
                        // TODO: Hide saving progressbar
                        if (typeof(lineup) === "string")
                        {
                           utils.handleError({
                                error: lineup,
                                security: security,
                                dataContext: dc
                            });
                        } else {
                            $scope.$apply(function () {
                               $scope.allLineups.push(lineup);
                                $scope.hideLineupWizard();
                                toastr.success(toasts.savedData);
                            });
                        }
                       $("#nextButton").prop('disabled', false);

                    }).fail(function (error) {
                          $("#nextButton").prop('disabled', false);
                        // TODO: Hide saving progressbar
                        utils.handleError({
                            error: error,
                            security: security,
                            dataContext: dc
                        });
                    });
                } else {
                    $.when(dc.lineups.updateData($scope.selectedLineup)).done(function (lineup) {
                        if (typeof(lineup) != "string") {
                            var foundLineup = _.filter($scope.allLineups, { 'LineupId' : $scope.selectedLineup.LineupId });
                            var index;
                            if (foundLineup.length > 0) {
                                index = $scope.allLineups.indexOf(foundLineup[0]);
                                // TODO: Hide saving progressbar

                                // update UI
                                $scope.$apply(function () {
                                    $scope.selectedLineup.Title = $scope.selectedLineup.LineupName + " (" + $scope.selectedLineup.ViewingArea + ")";
                                    $scope.allLineups.splice(index, 1);
                                    $scope.allLineups.push($scope.selectedLineup);
                                    $scope.hideLineupWizard();
                                    $scope.selectedLineup = {};
                                    toastr.success(toasts.savedData);
                                });
                            }
                        }
                        else {
                           utils.handleError({
                                error: lineup,
                                security: security,
                                dataContext: dc
                            });
                        }
                       $("#nextButton").prop('disabled', false);
                    }).fail(function (error) {
                          $("#nextButton").prop('disabled', false);

                          // TODO: Hide saving progressbar
                        utils.handleError({
                            error: error,
                            security: security,
                            dataContext: dc
                        });
                    });
                }
            };

            var validateStep = function() {
                if ($scope.isNew) {
                    return ($scope.selectedLineup.basicPackageId > 0 && $scope.selectedLineup.corePackageId > 0);
                } else {
                    return true;
                }
            };

            $scope.steps = [
                {
                    id: 0,
                    title: 'Basic Info',
                    header: 'Basic lineup info',
                    search: false,
                    validation: function () {
                        return validateStep();
                    }
                },
                {
                    id: 1,
                    title: 'Add Channels',
                    header: 'Add channel to a lineup',
                    search: true
                }
            ];
            $scope.currentStep = 1;
            $scope.step = 0;
            $scope.changeStep = function (step) {
                debug.log("changeStep(" + step + ")");
                $scope.step = step;
            };
            $scope.getCurrentStep = function() {
                return $scope.steps[$scope.step].title;
            };

            function getPackages () {
                var d = $q.defer();
                $.when(dc.packages.getData()).done(function(data) {
                    if (typeof(data) != "string") {
                        d.resolve(data);
                    } else {
                        d.reject(data.Data.Value);
                    }
                }).fail(function (error) {
                    d.reject(error);
                });
                return d.promise;
            }
            function getLineups () {
                var d = $q.defer();
                $.when(dc.lineups.getData()).done(function(data) {
                    if (typeof(data) != "string") {
                        d.resolve(data);
                    } else {
                        d.reject(data.Data.Value);
                    }
                }).fail(function (error) {
                    d.reject(error);
                });
                return d.promise;
            }
            function getPackageChannels (packageId) {
                // TODO: Cache channels in ds.Packages
                var d = $q.defer();
                $.when(dc.repository.getPackageChannels(packageId, $scope.selectedLineup.ViewingArea)).done(function (data) {
                    if (typeof(data) != "string") {
                        d.resolve(data);
                    } else {
                        d.reject(data.Data.Value);
                    }
                }).fail(function (error) {
                    d.reject(error);
                });
                return d.promise;
            }

//           function getLineupGroups (lineupId) {
//              var d = $q.defer();
//              $.when(dc.repository.getLineupGroups(lineupId)).done(function (data) {
//                 if (typeof(data) != "string") {
//                    d.resolve(data);
//                 } else {
//                    d.reject(data.Data.Value);
//                 }
//              }).fail(function (error) {
//                 d.reject(error);
//              });
//              return d.promise;
//           }

            function init() {
                $q.all([
                    getPackages(),
                    getLineups()
                ]).then(function (data) {
                    $scope.allCustomerPackages = data[0];
                    $scope.allLineups = data[1];

                    $scope.isLoaded = true;
                    if ($rootScope.isLineupsCached === undefined) {
                        $rootScope.isLineupsCached = true;
                        toastr.info(toasts.dataLoaded, "Lineups");
                    }
                }, function (error) {
                    utils.handleError({
                        error: error,
                        security: security,
                        dataContext: dc
                    });
                });
            }
            init();
        }]);
    }
);