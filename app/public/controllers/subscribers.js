define(['angular', 'config', 'services.utils', 'jQuery', 'controllers/controllers', 'dataContext', 'services/services'],
    function (angular, config, utils, $, controllers, dc) {
        'use strict';

        var debug = config.debug;
        var toasts = config.messages;
        var toastr = config.toastr;

        controllers.controller('subscribers', ['security', '$q', '$rootScope', '$scope', '$filter', function (security, $q, $rootScope, $scope, $filter) {
            debug.log('[subscribers] running.');

            $scope.selectedSubscriber = [];
            $scope.currentStep = 1;
            $scope.sortOrder = "FirstName";
            $scope.exclamationShow = false;
            $scope.isNew = false;

            $scope.getLineupNames = function (lineups, type) {
                var lineupNames = _.pluck(lineups, 'LineupName').join(', ');
                if (type === 'short' ) {
                    return lineupNames.substr(0, 12) + '...';
                } else {
                    return lineupNames;
                }

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
            $scope.openRemovePopOver = function (index, userId) {
                $scope.selectedIndex = index;
                $scope.selectedSubscriberId = userId;
                $("#UserItems" + index).addClass("selectedItem");
                var currPos = document.getElementById('UserItems' + index).offsetTop + 2;
                $("#RemovePopOver").css("top", currPos + "px")
                    .css("z-index", "1000")
                    .css("display", "block");
                $scope.showRemovePopOver = true;
            };
            $scope.hideRemovePopOver = function() {
                $("#UserItems" + $scope.selectedIndex).removeClass("selectedItem");
                $scope.selectedSubscriberId = null;
                $scope.showRemovePopOver = false;
            };
            $scope.removeSubscriber = function() {
                $.when(dc.subscribers.deleteById($scope.selectedSubscriberId)).done(function () {
                    // get user object
                    var subscriber = _.filter($scope.subscribers, { 'SubscriberId' : $scope.selectedSubscriberId });
                    var index;
                    if (subscriber.length > 0) {
                        var username = subscriber[0].UserName;
                        $scope.$apply(function () {
                            index = $scope.subscribers.indexOf(subscriber[0]);
                            $scope.subscribers.splice(index, 1);
                            $scope.hideRemovePopOver();
                            toastr.warning(username + " deleted.");
                            $scope.search();
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

            // UserLineup CheckBoxes
            $scope.isSubscriberLineup = function (lineup) {
                if ($scope.selectedSubscriber.Lineups.length > 0) {
                    var found = _.filter($scope.selectedSubscriber.Lineups, { 'LineupId': lineup.LineupId });
                    return (found.length > 0);
                }
            };
            $scope.addLineupToSubscriber = function (lineup, isAdd) {
                if (isAdd) {
                    $scope.selectedSubscriber.Lineups.push(lineup);
//                    $scope.selectedSubscriber.LineupIds.push(lineup.LineupId);
                } else {
                    var foundLineup = _.filter($scope.selectedSubscriber.Lineups, { 'LineupId' : lineup.LineupId });
                    // if not found, no need to remove
                    var index = -1;
                    if (foundLineup.length > 0) {
                        index = $scope.selectedSubscriber.Lineups.indexOf(foundLineup[0]);
                        // splice lineup from array
                        if (index !== -1) {
                            $scope.selectedSubscriber.Lineups.splice(index, 1);
                        }
                    }
                }
            };
            $scope.addGroupToSubscriber = function(group) {
                $scope.selectedSubscriber.Group = group;
            };
            $scope.checkLineups = false;
            $scope.addAllLineupsToSubscriber = function () {
//                // update all checkboxes
//                var lineupCheckboxes = $("#tableLineupInfo input.checkbox");
//
//                $scope.checkLineups = !$scope.checkLineups;
//                lineupCheckboxes.prop('checked', $scope.checkLineups);
            };

            // Wizard
            $scope.showSubscriberWizard = false;
            $scope.openSubscriberWizard = function (subscriber) {
                if (!$scope.showRemovePopOver) {
                    $('body').addClass('stop-scrolling');
                    $scope.isNew = false;
                    $scope.selectedSubscriber = angular.copy(subscriber);
                    $scope.dialogTitle = subscriber.FirstName + " " + subscriber.LastName;
                    $scope.showSubscriberWizard = true;
                } else {
                    debug.log("openSubscriberWizard requested, but removePopOver already open!");
                    toastr.warning("Please complete the delete action first.");
                }
            };
            $scope.openNewSubscriberWizard = function () {
                if (!$scope.showRemovePopOver) {
                    $scope.selectedSubscriber = {};
                    $scope.selectedSubscriber.Lineups = [];
//                    $scope.selectedSubscriber.LineupIds = [];
                    $('body').addClass('stop-scrolling');
                    $scope.isNew = true;
                    $scope.dialogTitle = "Add Subscriber";
                    $scope.showSubscriberWizard = true;
                } else {
                    debug.log("openNewSubscriberWizard requested, but removePopOver already open!");
                    toastr.warning("Please complete the delete action first.");
                }
            };
            $scope.filterByViewingArea = function (array) {
                var filteredArray = _.filter(array, { 'ViewingArea': $scope.selectedSubscriber.ViewingArea });
                return filteredArray;
            };
            $scope.hideSubscriberWizard = function () {
                $('body').removeClass('stop-scrolling');
                $scope.step = 0;
                $scope.showSubscriberWizard = false;
            };
            $scope.saveSubscriber = function () {
               $("#nextButton").prop('disabled', true);
                if ($scope.isNew) {
                    $.when(dc.subscribers.addData($scope.selectedSubscriber)).done(function (subscriber) {
                        if (typeof(subscriber) === "string")
                        {
                            utils.handleError({
                                error: subscriber,
                                security: security,
                                dataContext: dc
                            });
                        } else {
                            $scope.$apply(function () {
                                $scope.subscribers.push(subscriber);
                                $scope.hideSubscriberWizard();
                                $scope.search();
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
                    $.when(dc.subscribers.updateData($scope.selectedSubscriber)).done(function () {
                        var subscriber = _.filter($scope.subscribers, { 'SubscriberId' : $scope.selectedSubscriber.SubscriberId });
                        var index;
                        if (subscriber.length > 0) {
                            index = $scope.subscribers.indexOf(subscriber[0]);
                            // TODO: Hide saving progressbar

                            // update UI
                            $scope.$apply(function () {
                                $scope.subscribers.splice(index, 1);
                                $scope.subscribers.push($scope.selectedSubscriber);
                                $scope.hideSubscriberWizard();
                                $scope.search();
                                $scope.selectedSubscriber = {};
                                toastr.success(toasts.savedData);
                            });
                        } else {
                            toastr.warning(toasts.errorSavingData);
                        }
                       $("#nextButton").prop('disabled', false)
                    }).fail(function (error) {
                          $("#nextButton").prop('disabled', false)
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
                    title: 'Subscriber Info',
                    header: 'Basic subscriber info'
                },
                {
                    id: 1,
                    title: 'Group Info',
                    header: 'Add subscriber to a group'
                },
                {
                    id: 2,
                    title: 'Lineup Info',
                    header: 'Issue lineup entitlement'
                }
            ];
            $scope.step = 0;
            $scope.changeStep = function (step) {
                $scope.step = step;
            };
            $scope.getCurrentStep = function() {
                return $scope.steps[$scope.step].title;
            };

            // Paging, sorting, filtering of main grid
            $scope.sortBy = function(newSortingOrder) {
                if ($scope.sortOrder === newSortingOrder){
                    $scope.reverse = !$scope.reverse;
                }
                $scope.sortOrder = newSortingOrder;
                // icon setup
                $('th i').each(function(){
                    // icon reset
                    $(this).removeClass().addClass('icon-sort');
                });
                if ($scope.reverse){
                    $('th.'+newSortingOrder+' i').removeClass().addClass('icon-chevron-up');
                }else{
                    $('th.'+newSortingOrder+' i').removeClass().addClass('icon-chevron-down');
                }
            };
            $scope.filteredUsers = [];
            $scope.groupedUsers  = [];
            $scope.usersPerPage  = 15;
            $scope.pagedUsers    = [];
            $scope.currentPage   = 0;

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
            // init the filtered items
            $scope.search = function () {
                $scope.filteredUsers = $filter('filter')($scope.subscribers, function (user) {
                    var keys = Object.keys(user);
                    var i = 0;
                    for (i; i < keys.length; i++) {
                        var currentKey = keys[i];
                        if (searchMatch(user[currentKey], $scope.query)){
                            return true;
                        }
                    }
                    return false;
                });
                // take care of the sorting order
                if ($scope.sortOrder !== '') {
                    $scope.filteredUsers = $filter('orderBy')($scope.filteredUsers, $scope.sortOrder, $scope.reverse);
                }
                $scope.currentPage = 0;
                // now group by pages
                $scope.groupToPages();
            };

            // calculate page in place
            $scope.groupToPages = function () {
                $scope.pagedUsers = [];
                var i =0;
                for (i; i < $scope.filteredUsers.length; i++) {
                    if (i % $scope.usersPerPage === 0) {
                        $scope.pagedUsers[Math.floor(i / $scope.usersPerPage)] = [ $scope.filteredUsers[i] ];
                    } else {
                        $scope.pagedUsers[Math.floor(i / $scope.usersPerPage)].push($scope.filteredUsers[i]);
                    }
                }
            };
            $scope.range = function (start, end) {
                var ret = [];
                if (!end) {
                    end   = start;
                    start = 0;
                }
                var i = start;
                for (i; i < end; i++) {
                    ret.push(i);
                }
                return ret;
            };
            $scope.prevPage = function () {
                if ($scope.currentPage > 0) {
                    $scope.currentPage--;
                }
            };
            $scope.nextPage = function () {
                if ($scope.currentPage < $scope.pagedUsers.length - 1) {
                    $scope.currentPage++;
                }
            };
            $scope.setPage = function () {
                $scope.currentPage = this.n;
            };

            // Wrap $ promises in ng promises, so we call use the $q.all and
            // avoid digest errors in Angular
            function getSubscribers () {
                var d = $q.defer();
                $.when(dc.subscribers.getData()).done(function(data) {
                    if (data.Data === undefined) {
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
                    if (data.Data === undefined) {
                        d.resolve(data);
                    } else {
                        d.reject(data.Data.Value);
                    }
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

                    // associate lineups to subscriber
                    _.forEach($scope.subscribers, function (subscriber) {
                        if (subscriber.LineupIds != null) {
                            subscriber.Lineups = [];
                            _.forEach(subscriber.LineupIds, function(lineupId) {
                                var lineup = _.filter($scope.lineups, { 'LineupId': lineupId.toString() });
                                if (lineup.length > 0) {
                                    subscriber.Lineups.push(lineup[0]);
                                }
                            });
                        }
                    });

                    $scope.search();
                    $scope.isLoaded = true;
                        if ($rootScope.isSubscribersCached === undefined) {
                            $rootScope.isSubscribersCached = true;
                            toastr.info(toasts.dataLoaded, "Subscribers");
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