define(['config', 'amplify', 'mocks', 'services.utils'],
   function (config, amplify, mocks, utils) {
      'use strict';

      var debug = config.debug;

      var init = function () {
         if (config.useMocks) {
            amplify.request.define('GetGroups', function (settings) {
               settings.success(false, mocks.groups);
            });

            amplify.request.define('AddOrUpdateGroup', function (settings) {
               var group = settings.data;
               if (!group.GroupID || group.GroupID === 0) {
                  group.GroupID = utils.randomFromInterval(300,600);
               }
               settings.success(false, group);
            });

            amplify.request.define('DeleteGroup', function (settings) {
               settings.success(false, 'Item deleted');
            });
         } else {
            amplify.request.define('AddOrUpdateGroup', 'ajax', {
               url: config.apiUrl + 'customers/{CustomerID}/groups',
               dataType: 'json',
               type: 'PUT',
               contentType: 'application/json; charset=utf-8',
               dataMap: function (data) { return JSON.stringify(data); },
               decoder: utils.statusDecoder
            });

            amplify.request.define('GetGroups', 'ajax', {
               url: config.apiUrl + 'customers/{CustomerID}/groups',
               dataType: 'json',
               type: 'GET',
               decoder: utils.statusDecoder
            });

            amplify.request.define('DeleteGroup', 'ajax', {
               url: config.apiUrl + 'customers/{CustomerID}/groups/{GroupID}',
               dataType: 'json',
               type: 'DELETE',
               contentType: 'application/json; charset=utf-8',
               decoder: utils.statusDecoder
            });

         }
      };

      function GroupLight(groupName, numberOfSubscribers) {
         return {
            GroupName: groupName,
            NumberOfSubscribers: numberOfSubscribers
         };
      }

      function addDerivedProperties (group) {
         group.ViewingArea = group.ViewingArea.toTitleCase();
         group.Title = checkIfTextIsTooLong(group.GroupName, 36) + " (" + group.ViewingArea + ")";
         group.LightGroups = [new GroupLight("Individuals", group.NumberOfSubscribers), new GroupLight("Clients", 0)];
         return group;
      }
      function checkIfTextIsTooLong(textString, limit) {
            if (textString && textString.length > limit) {
                textString = textString.substr(0, limit) + "...";
            }
            return textString;
        }

      var getGroups = function (callbacks) {
         var result = amplify.store("Groups");
         if (result) {
            _.forEach(result, function (item) {
               addDerivedProperties(item);
            });
            callbacks.success(result);
         } else {
            return amplify.request('GetGroups', { CustomerID: config.customerId },
            function (isError, result) {
               if (isError) {
                  debug.error("ds.Groups.getGroups(): " + result);
                  callbacks.error(result);
               } else {
                  amplify.store("Groups", result, { expires: config.cacheExpiration });
                  _.forEach(result, function (item) {
                     addDerivedProperties(item);
                  });
                  callbacks.success(result);
               }
            });
         }
      };

      var addGroup = function (callbacks, group) {
         group.CustomerID = config.customerId;
         group.ViewingArea = group.ViewingArea.toLowerCase();
         return amplify.request('AddOrUpdateGroup', group,
            function (isError, result) {
               if (isError) {
                  debug.error("ds.groups.add()", result);
                  callbacks.error(result);
               } else {
                  var groups = amplify.store("Groups");
                  groups.push(result);
                  amplify.store("Groups", groups, { expires: config.cacheExpiration });
                  callbacks.success(addDerivedProperties(result));
               }
            }
         );
      };
      var deleteGroup = function (callbacks, id) {
         return amplify.request('DeleteGroup', { CustomerID: config.customerId, GroupID: id },
            function (isError, result) {
               if (isError) {
                  debug.error("ds.Groups.deleteGroup(): " + result);
                  callbacks.error(result);
               } else {
                  var groups = amplify.store("Groups");
                  var foundGroup = _.filter(groups, { 'GroupId' : id });
                  var index;
                  if (foundGroup.length > 0) {
                     index = groups.indexOf(foundGroup[0]);
                     // remove the old item from the array
                     groups.splice(index, 1);
                     amplify.store("Groups", groups, { expires: config.cacheExpiration });
                  }
                  callbacks.success(result);
               }
            }
         );
      };
      var updateGroup = function (callbacks, group) {
         group.CustomerID = config.customerId;
         group.ViewingArea = group.ViewingArea.toLowerCase();
         return amplify.request('AddOrUpdateGroup', group,
            function (isError, result) {
               if (isError) {
                  debug.error("ds.groups.update()", result);
                  callbacks.error(result);
               } else {
                  var savedGroup = result;
                  var groups = amplify.store("Groups");
                  var foundGroup = _.filter(groups, { 'GroupId' : savedGroup.GroupId });
                  var index;
                  if (foundGroup.length > 0) {
                     index = groups.indexOf(foundGroup[0]);
                     // update groups array with the edited values
                     groups.splice(index, 1);
                     groups.push(savedGroup);
                     amplify.store("Groups", groups, { expires: config.cacheExpiration });
                  }
                  callbacks.success(addDerivedProperties(savedGroup));
               }
            }
         );
      };

      var clearCache = function () {
         amplify.store("Groups", null);
      };

      init();

      return {
         addGroup: addGroup,
         deleteGroup: deleteGroup,
         getGroups: getGroups,
         updateGroup: updateGroup,
         clearCache: clearCache
      };
   }
);

