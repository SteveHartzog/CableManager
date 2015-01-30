define(['config', 'controllers/controllers', 'jQuery', 'services.utils', 'dataContext', 'models/channel', 'services/services'],
    function (config, controllers, $, utils, dc) {
        'use strict';

        var debug = config.debug;
        var toastr = config.toastr;

        controllers.controller('masterChannelList', ['$scope', '$location', '$filter', function ($scope, $location, $filter) {
            debug.log('[controller.masterChannelList] running.');

            $scope.isLoaded = false;
            $scope.channels = [];

            $scope.sortOrder = 'ChannelName';
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

            $scope.filteredChannels = [];
            $scope.groupedChannels  = [];
            $scope.channelsPerPage  = 20;
            $scope.pagedChannels    = [];
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
                $scope.filteredChannels = $filter('filter')($scope.channels, function (channel) {
                    var keys = Object.keys(channel);
                    var i = 0;
                    for (i; i < keys.length; i++) {
                        var currentKey = keys[i];
                            if (searchMatch(channel[currentKey], $scope.query)){
                                return true;
                            }
                    }
                    return false;
                });
                // take care of the sorting order
                if ($scope.sortOrder !== '') {
                    $scope.filteredChannels = $filter('orderBy')($scope.filteredChannels, $scope.sortOrder, $scope.reverse);
                }
                $scope.currentPage = 0;
                // now group by pages
                $scope.groupToPages();
            };

            // calculate page in place
            $scope.groupToPages = function () {
                $scope.pagedChannels = [];
                var i =0;
                for (i; i < $scope.filteredChannels.length; i++) {
                    if (i % $scope.channelsPerPage === 0) {
                        $scope.pagedChannels[Math.floor(i / $scope.channelsPerPage)] = [ $scope.filteredChannels[i] ];
                    } else {
                        $scope.pagedChannels[Math.floor(i / $scope.channelsPerPage)].push($scope.filteredChannels[i]);
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
                if ($scope.currentPage < $scope.pagedChannels.length - 1) {
                    $scope.currentPage++;
                }
            };
            $scope.setPage = function () {
                $scope.currentPage = this.n;
            };

            $scope.getChannelsByCustomer = function() {
                // TODO: create js repository method to call Repository.GetChannelsByCustomer
            }

            // TODO: Move this to the dataContext or dataService
            function BuildAllChannelArray(allChannelArray, allServiceArray, parentScope) {
                var result = [];

                if (allChannelArray !== null) {
                    var i = 0;
                    var il = allChannelArray.length;
                    for (i, il; i < il; i++) {
                        var channels = new Channel(allChannelArray[i].ServiceId, allChannelArray[i].ChannelName, allChannelArray[i].ChannelNumber, allChannelArray[i].DefaultChannelNumber, allChannelArray[i].ServiceName, allChannelArray[i].PartOfPackageId, allChannelArray[i].ViewingArea, allChannelArray[i].Lineups, allChannelArray[i].Groups, allServiceArray, parentScope);
                        result.push(channels);
                    }
                }
                return result;
            }

            function load () {
                $.when(dc.masterChannelList.getData()).done(function (channels) {
                    $.when(dc.packages.getData()).done(function (services) {
                        $scope.channels = new BuildAllChannelArray(channels, services, this);
                        $scope.search();
                        $scope.isLoaded = true;
                        toastr.info("Channels loaded successfully.");
                        $scope.$apply();
                    }).fail(function (error) {
                        if (error === "User not authenticated.") {
                            toastr.warning(toasts.sessionExpired);
                            $location.path("/Login");
                        }
                    });
                }).fail(function (error) {
                    if (error === "User not authenticated.") {
                        toastr.warning(toasts.sessionExpired);
                        $location.path("/Login");
                    }
                });
            }

            load();
        }]);
    }
);


