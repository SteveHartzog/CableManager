define(['config', 'lodash', 'amplify', 'mocks', 'services.utils'],
   function (config, _, amplify, mocks, utils) {
      'use strict';

      var debug = config.debug;

      var init = function () {
            if (config.useMocks) {
                amplify.request.define('GetLineups', function (settings) {
                    settings.success(false, mocks.lineups);
                });

                amplify.request.define('AddOrUpdateLineup', function (settings) {
                    var lineup = settings.data;
                    if (!lineup.LineupID || lineup.LineupID === 0) {
                        lineup.LineupID = utils.randomFromInterval(300,600);
                    }
                    settings.success(false, lineup);
                });

                amplify.request.define('DeleteLineup', function (settings) {
                    settings.success(false, 'Item deleted');
                });
            } else {
               amplify.request.define('AddOrUpdateLineup', 'ajax', {
                  url: config.apiUrl + 'customers/{CustomerID}/lineups',
                  dataType: 'json',
                  type: 'PUT',
                  contentType: 'application/json; charset=utf-8',
                  dataMap: function (data) { return JSON.stringify(data); },
                  decoder: utils.statusDecoder
               });
               amplify.request.define('GetLineups', 'ajax', {
                    url: config.apiUrl + 'customers/{CustomerID}/lineups',
                    dataType: 'json',
                    type: 'GET',
                    decoder: utils.statusDecoder
                });
               amplify.request.define('DeleteLineup', 'ajax', {
                  url: config.apiUrl + 'customers/{CustomerID}/lineups/{LineupID}',
                  dataType: 'json',
                  type: 'DELETE',
                  contentType: 'application/json; charset=utf-8',
                  decoder: utils.statusDecoder
               });

//               amplify.request.define('GetLineupGroups', 'ajax', {
//                  url: config.apiUrl + 'customers/{CustomerID}/groups?lineup_id={LineupID}',
//                  dataType: 'json',
//                  type: 'GET',
//                  decoder: utils.statusDecoder
//               });
               amplify.request.define('GetLineupChannels', 'ajax', {
                  url: config.apiUrl + 'customers/{CustomerID}/lineups/{LineupID}/channels',
                  dataType: 'json',
                  type: 'GET',
                  decoder: utils.statusDecoder
               });
               amplify.request.define('UpdateLineupChannels', 'ajax', {
                  url: config.apiUrl + 'customers/{CustomerID}/lineups/{LineupID}/channels',
                  dataType: 'json',
                  type: 'POST',
                  contentType: 'application/json; charset=utf-8',
                  dataMap: function (data) { return JSON.stringify(data); },
                  decoder: utils.statusDecoder
               });
            }
        };

      function addDerivedProperties (lineup) {
         lineup.ViewingArea = lineup.ViewingArea.toTitleCase();
         lineup.Title = checkIfTextIsTooLong(lineup.LineupName, 36) + " (" + lineup.ViewingArea + ")";
   //         lineup.Channels = getLineupChannels(lineup.LineupId);
//            lineup.Groups = result;
         return lineup;
      }
      function checkIfTextIsTooLong(textString, limit) {
         if (textString && textString.length > limit) {
            textString = textString.substr(0, limit) + "...";
         }
         return textString;
      }
      function getLineupChannels (lineupId) {
         var storeName = "LineupChannels_" + lineupId;
         var result = amplify.store(storeName);
         if (result) {
            return result;
         } else {
            amplify.request('GetLineupChannels', { CustomerID: config.customerId, LineupID: lineupId },
               function (isError, result) {
                  if (isError) {
                     debug.error("ds.Lineup.getLineupChannels(" + lineupId + "): " + result);
                  } else {
                     amplify.store(storeName, result, { expires: config.cacheExpiration });
                     return result;
                  }
               }
            );
         }
      }

      function updateLineupChannels (lineup) {
//         var channels = lineup.Channels;
//         channels.CustomerID = config.customerId;
//         channels.LineupID = lineup.LineupId;
//         return amplify.request('UpdateLineupChannels', channels,
//            function (isError, result) {
//               if (isError) {
//                  debug.error("ds.Lineups.updateLineupChannels())", result);
//               } else {
                  var storeName = "LineupChannels_" + lineup.LineupId;
                  var lineupChannels = amplify.store(storeName);
                  lineupChannels.push(lineup.Channels);
                  amplify.store(storeName, lineupChannels, { expires: config.cacheExpiration });
//               }
//            }
//         );
      }

      var getLineups = function (callbacks) {
         var result = amplify.store("Lineups");
         if (result) {
            _.forEach(result, function (item) {
               addDerivedProperties(item);
            });
            callbacks.success(result);
         } else {
            return amplify.request('GetLineups', { CustomerID: config.customerId },
               function (isError, result) {
                  if (isError) {
                     debug.error("ds.Lineups.get()", result);
                     callbacks.error(result);
                  } else {
                     amplify.store("Lineups", result, { expires: config.cacheExpiration });
                     _.forEach(result, function (item) {
                        addDerivedProperties(item);
                     });
                     return result;
                  }
               }
            );
         }
      };
//      var getLineupGroups = function (callbacks, lineupId) {
//         var storeName = "LineupGroups_" + lineupId;
//         var result = amplify.store(storeName);
//         if (result) {
//            callbacks.success(result);
//         } else {
//            return amplify.request('GetLineupGroups', { CustomerID: config.customerId, LineupID: lineupId },
//               function (isError, result) {
//                  if (isError) {
//                     debug.error("ds.Lineup.getLineupGroups(" + lineupId + "): " + result);
//                  } else {
//                     amplify.store(storeName, result, { expires: config.cacheExpiration });
//                     callbacks.success(result);
//                  }
//               }
//            );
//         }
//      };
      var deleteLineup = function (callbacks, id) {
         return amplify.request('DeleteLineup', { CustomerID: config.customerId, LineupID: id },
            function (isError, result){
               if (isError) {
                  debug.error("ds.Groups.deleteLineup(): " + result);
                  callbacks.error(result);
               } else {
                  var lineups = amplify.store("Lineups");
                  var foundLineup = _.filter(lineups, { 'LineupId' : id });
                  var index;
                  if (foundLineup.length > 0) {
                     index = lineups.indexOf(foundLineup[0]);
                     // remove the old item from the array
                     lineups.splice(index, 1);
                     amplify.store("Lineups", lineups, { expires: config.cacheExpiration });
                     amplify.store("LineupChannels_" + id, null);
                  }
                  callbacks.success(result);
               }
            }
         );
        };
      var addLineup = function (callbacks, lineup) {
         lineup.CustomerID = config.customerId;
         lineup.ViewingArea = lineup.ViewingArea.toLowerCase();
         return amplify.request('AddOrUpdateLineup', lineup,
            function (isError, result) {
               if (isError) {
                  debug.error("ds.Lineups.add())", result);
                  callbacks.error(result);
               } else {
                  var savedLineup = result;
                  updateLineupChannels(savedLineup);

                  var lineups = amplify.store("Lineups");
                  lineups.push(savedLineup);
                  amplify.store("Lineups", lineups, { expires: config.cacheExpiration });

                  var extendedLineup = addDerivedProperties(savedLineup);
                  extendedLineup.Groups = [];
                  callbacks.success(extendedLineup);
               }
            }
         );
      };
      var updateLineup = function (callbacks, lineup) {
         lineup.CustomerID = config.customerId;
         lineup.ViewingArea = lineup.ViewingArea.toLowerCase();
         return amplify.request('AddOrUpdateLineup', lineup,
            function (isError, result) {
            if (isError) {
               debug.error("ds.groups.update()", result);
               callbacks.error(result);
            } else {
               updateLineupChannels(lineup);

               var lineups = amplify.store("Lineups");
               var foundLineup = _.filter(lineups, { 'LineupId' : lineup.LineupId });
               var index;
               if (foundLineup.length > 0) {
                  index = lineups.indexOf(foundLineup[0]);
                  // update groups array with the edited values
                  lineups.splice(index, 1);
                  lineups.push(result);
                  amplify.store("Lineups", lineups, { expires: config.cacheExpiration });
               }
            callbacks.success(addDerivedProperties(result));
            }
         });
      };
      var clearCache = function () {
         amplify.store("Lineups", null);
      };

      init();

      return {
         addLineup: addLineup,
         getLineups: getLineups,
//         getLineupGroups: getLineupGroups,
         deleteLineup: deleteLineup,
         updateLineup: updateLineup,
         clearCache: clearCache
      };
   }
);

