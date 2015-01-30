define(['angular', 'lodash', 'config', 'controllers/controllers', 'jQuery', 'services.utils', 'dataContext', 'services/services'],
    function (angular, _, config, controllers, $, utils, dc) {
        'use strict';

        var debug = config.debug;
        var toasts = config.messages;
        var toastr = config.toastr;

        controllers.controller('groups', ['security', '$q', '$rootScope', '$scope', function (security, $q, $rootScope, $scope) {
            debug.log('[controller.groups] running.');

            $scope.exclamationShow = false;

            $scope.currentStep = 1;
            $scope.isLoaded = false;

            $scope.ShowAllUserChecked = false;
            $scope.showAllLineupChecked = false;
            $scope.sortOrder = 'FirstName';

            $scope.isNew = false;

            $scope.sortBy = function(table, newSortingOrder) {
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
                    $('#table' + table + ' th.'+newSortingOrder+' i').removeClass().addClass('icon-chevron-up');
                }else{
                    $('#table' + table + ' th.'+newSortingOrder+' i').removeClass().addClass('icon-chevron-down');
                }
            };
            $scope.filterByViewingArea = function (array) {
                var filteredArray = _.filter(array, { 'ViewingArea': $scope.selectedGroup.ViewingArea });
                return filteredArray;
            };

            $scope.getAvailableLicenses = function (licenseInfo) {
                var availableLicenses = 0;
                if (licenseInfo && licenseInfo.TotalLicenses) {
                    availableLicenses = licenseInfo.TotalLicenses - licenseInfo.UsedLicenses;
                }
                if (availableLicenses === 0) {
                    $scope.exclamationShow = true;
                }
                else {
                    $scope.exclamationShow = false;
                }
                return availableLicenses;
            };

            // RemovePopOver
            $scope.showRemovePopOver = false;
            $scope.openRemovePopOver = function (currentCard, groupId) {
                $scope.selectedGroupId = groupId;
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
                $scope.selectedGroupId = null;
                $scope.showRemovePopOver = false;
            };
            $scope.removeGroup = function() {
                $.when(dc.groups.deleteById($scope.selectedGroupId)).done(function () {
                    // get group object
                    var group = _.filter($scope.groups, { 'GroupId' : $scope.selectedGroupId });
                    var groupName = group[0].GroupName;
                    var index;
                    if (group.length > 0) {
                        $scope.$apply(function () {
                            index = $scope.groups.indexOf(group[0]);
                            // splice user from array
                            $scope.groups.splice(index, 1);
                            $scope.hideRemovePopOver();
                            toastr.warning(groupName + " deleted.");
                        });
                    } else {
                        $scope.hideRemovePopOver();
                    }

            }).fail(function (error) {
                    utils.handleError({
                        error: error,
                        security: security,
                        dataContext: dc
                    });
                    $scope.hideRemovePopOver();
                });
            };

            // GroupSubscribers CheckBoxes
            $scope.isGroupSubscriber = function (subscriberId) {
                var found = false;
               if ($scope.selectedGroup.Subscribers === null) {
                  $scope.selectedGroup.Subscribers = [];
               }
                if ($scope.selectedGroup.Subscribers.length > 0) {
                    var foundSubscriber = _.filter($scope.selectedGroup.Subscribers, { 'SubscriberId': subscriberId });
                    found = foundSubscriber.length > 0;
                }
                return found;
            };
            $scope.addSubscriberToGroup = function (subscriber, isAdd) {
                if (isAdd) {
                    $scope.selectedGroup.Subscribers.push(subscriber);
                } else {
                    var found = _.filter($scope.selectedGroup.Subscribers, { 'SubscriberId' : subscriber.SubscriberId });
                    // if not found, no need to remove
                    var index = -1;
                    if (found.length > 0) {
                        index = $scope.selectedGroup.Subscribers.indexOf(found[0]);
                        // splice user from array
                        if (index !== -1) {
                            $scope.selectedGroup.Subscribers.splice(index, 1);
                        }
                    }
                }
            };
//            $scope.checkUsers = false;
//            $scope.addAllUsersToGroup = function () {
//                // overwrite UserIds with all user ids
//                $scope.selectedGroup.UserIds = _.pluck($scope.users, "UserId");
//
//                // update all checkboxes
//                var userCheckboxes = $("#tableUsers input.checkbox");
//
//                $scope.checkUsers = !$scope.checkUsers;
//                userCheckboxes.prop('checked', $scope.checkUsers);
//
//                delete this.userCheckboxes;
//            };

            // GroupLineups CheckBoxes
            $scope.isGroupLineup = function (lineupId) {
                var found = false;
                if ($scope.selectedGroup.Lineups.length > 0) {
                    var foundUserGroup = _.filter($scope.selectedGroup.Lineups, { 'LineupId': lineupId });
                    found = foundUserGroup.length > 0;
                }
                return found;
            };
            $scope.addLineupToGroup = function (lineup, isAdd) {
                if (isAdd) {
                    $scope.selectedGroup.Lineups.push(lineup);
                } else {
                    var foundLineup = _.filter($scope.selectedGroup.Lineups, { 'LineupId' : lineup.LineupId });
                    // if not found, no need to remove
                    var index = -1;
                    if (foundLineup.length > 0) {
                        index = $scope.selectedGroup.Lineups.indexOf(foundLineup[0]);
                        // splice lineup from array
                        if (index !== -1) {
                            $scope.selectedGroup.Lineups.splice(index, 1);
                        }
                    }
                }
            };
            $scope.checkLineups = false;
            $scope.addAllLineupsToGroup = function () {
                // overwrite LineupIds with all lineup ids
                $scope.selectedGroup.LineupIds = _.pluck($scope.Lineups, "LineupId");

                // update all checkboxes
                var lineupCheckboxes = $("#tableLineups input.checkbox");

                $scope.checkLineups = !$scope.checkLineups;
                lineupCheckboxes.prop('checked', $scope.checkLineups);

                delete this.lineupCheckboxes;
            };

            // StartupChannels CheckBoxes
            $scope.isGroupChannel = function (serviceId) {
                // TODO: Implement Startup Channels feature (was never implemented)
            };

            // Wizard
            $scope.showGroupWizard = false;
            $scope.openGroupWizard = function (group) {
                if (!$scope.showRemovePopOver)
                {
                    $('body').addClass('stop-scrolling');
                    $scope.isNew = false;
                    $scope.selectedGroup = {};
                    $scope.selectedGroup = angular.copy(group);
                    $scope.dialogTitle = $scope.selectedGroup.GroupName;
                    $scope.showGroupWizard = true;
                } else {
                    debug.log("openGroupWizard requested, but removePopOver already open!");
                    toastr.warn("Please complete the delete action first.");
                }
            };
            $scope.openNewGroupWizard = function () {
                if (!$scope.showRemovePopOver) {
                    $scope.selectedGroup = {};
                    $scope.selectedGroup.Lineups = [];
                    $scope.selectedGroup.Subscribers = [];
                    $('body').addClass('stop-scrolling');
                    $scope.isNew = true;
                    $scope.dialogTitle = "Add Group";
                    $scope.showGroupWizard = true;
                } else {
                    debug.log("openNewGroupWizard requested, but removePopOver already open!");
                    toastr.warn("Please complete the delete action first.");
                }
            };
            $scope.hideGroupWizard = function () {
                $('body').removeClass('stop-scrolling');
                $scope.step = 0;
                $scope.showGroupWizard = false;
            };
            $scope.saveGroup = function () {
               // disable wizard save button as soon as possible to prevent double submits
               $("#nextButton").prop('disabled', true);
                if ($scope.isNew) {
                    $.when(dc.groups.addData($scope.selectedGroup)).done(function (group) {
                        $scope.step = 0;
                        if (typeof(group) === "string")
                        {
                            utils.handleError({
                                error: group,
                                security: security,
                                dataContext: dc
                            });
                        } else {
                            $scope.$apply(function () {
                                $scope.groups.push(group);
                                $scope.hideGroupWizard();
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
                    // TODO: Show saving progressbar
                    $.when(dc.groups.updateData($scope.selectedGroup)).done(function (savedGroup) {
                        var group = _.filter($scope.groups, { 'GroupId' : savedGroup.GroupId });
                        var index;
                        if (group.length > 0) {
                            index = $scope.groups.indexOf(group[0]);
                            // TODO: Hide saving progressbar

                            // update UI
                            $scope.$apply(function () {
                                $scope.groups.splice(index, 1);
                                $scope.groups.push(savedGroup);
                                $scope.selectedGroup = {};
                                $scope.hideGroupWizard();
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
                }
            };

            $scope.steps = [
                {
                    id: 0,
                    title: 'Group Info',
                    header: 'Basic group info',
                    search: false
                },
                {
                    id: 1,
                    title: 'Subs',
                    header: 'Add subscriber to a group',
                    search: false
                },
                {
                    id: 2,
                    title: 'Lineups',
                    header: 'Issue lineup entitlement',
                    search: false
                }
//                ,
//                {
//                    id: 3,
//                    title: 'Startup Channel',
//                    header: 'Select a startup channel',
//                    search: false
//                }
            ];
            $scope.step = 0;
            $scope.changeStep = function (step) {
                $scope.step = step;
            };
            $scope.getCurrentStep = function() {
                return $scope.steps[$scope.step].title;
            };

            function getSubscribers () {
                var d = $q.defer();
                $.when(dc.subscribers.getData()).done(function(data) {
                    d.resolve(data);
                }).fail(function (error) {
                    d.reject(error);
                });
                return d.promise;
            }
            function getLineups () {
                var d = $q.defer();
                $.when(dc.lineups.getData()).done(function(data) {
                    d.resolve(data);
                }).fail(function (error) {
                    d.reject(error);
                });
                return d.promise;
            }
            function getGroups () {
                var d = $q.defer();
                $.when(dc.groups.getData()).done(function(data) {
                    d.resolve(data);
                }).fail(function (error) {
                    d.reject(error);
                });
                return d.promise;
            }

            function init() {
                $q.all([
                    getSubscribers(),
                    getLineups(),
                    getGroups()
                ]).then(function (data) {
                    $scope.subscribers = data[0];
                    $scope.lineups = data[1];
                    $scope.groups = data[2];

                    $scope.isLoaded = true;
                    if ($rootScope.isGroupsCached === undefined) {
                        $rootScope.isGroupsCached = true;
                        toastr.info("Data loaded successfully.", "Groups");
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
