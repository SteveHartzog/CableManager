define(['jQuery', 'lodash', 'services.utils', 'dataService', 'amplify', 'config'],
   function ($, _, utils, ds, amplify, config) {
      'use strict';

      var debug = config.debug;
      debug.log("dataContext Loaded.");

      function logRestError(entityName, caller, error) {
         var currentDate = new Date();
         var seconds = currentDate.getSeconds();
         if (seconds < 10) {
             seconds = "0" + seconds;
         }
         var timeStamp = currentDate.getFullYear() + "." + currentDate.getMonth() + "." + currentDate.getDate() + " @ " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + seconds;
         debug.error(entityName + "." + caller + " Error [" + timeStamp + "]: " + error);
      }

      function EntitySet (options) {
         var entityName = options.EntityName,
             addFunction = options.AddFunction,
             deleteFunction = options.DeleteFunction,
             getFunction = options.GetFunction,
             updateFunction = options.UpdateFunction;
         var addData = function (newObj) {
      //                    items[newObj.id()] = newObj;
            updateUserSession();
             return $.Deferred(function (def) {
                 if (!addFunction) {
                     logRestError(entityName, "addFunction", "Not implemented.");
                     def.reject(error);
                     return;
                 }

                 addFunction({
                     success: function (response) {
                         def.resolve(response);
                     },
                     error: function (error) {
                         logRestError(entityName, "addFunction", error);
                         def.reject(error);
                     }
                 }, newObj);
             }).promise();
         };
         var deleteData = function (id) {
            updateUserSession();
             return $.Deferred(function (def) {
                 if (!deleteFunction) {
                     logRestError(entityName, "deleteFunction", "Not implemented.");
                     def.reject();
                     return;
                 }

                 deleteFunction({
                     success: function (result) {
                         def.resolve(result);
                     },
                     error: function (error) {
                         logRestError(entityName, "deleteFunction", error)
                         def.reject(error);
                     }
                 }, id);
             }).promise();
         };
         var getData = function () {
            updateUserSession();
             return $.Deferred(function (def) {
                 if (!getFunction) {
                     logRestError(entityName, "getFunction", "Not implemented.");
                     def.reject();
                     return;
                 }

                 getFunction({
                     success: function (dtoList) {
                         def.resolve(dtoList);
                     },
                     error: function (error) {
                         logRestError(entityName, "getFunction", error);
                         def.reject(error);
                     }
                 });
             }).promise();
         };
         var updateData = function (entity, callbacks) {
            updateUserSession();
             return $.Deferred(function (def) {
                 if (!updateFunction) {
                     logRestError(entityName, "updateFunction", "Not implemented.");
                     if (callbacks && callbacks.error) { callbacks.error(); }
                     def.reject();
                     return;
                 }

                 updateFunction({
                     success: function (response) {
                         def.resolve(response);
                     },
                     error: function (error) {
                         logRestError(entityName, "updateFunction", error);
                         def.reject(error);
                     }
                 }, entity);
             }).promise();
         };

         return {
             addData: addData,
             deleteById: deleteData,
             getData: getData,
             updateData: updateData
         };
      }

      //----------------------------------
      // dataService EntitySets
      //
      // Use dataService's 'get' method
      //----------------------------------
      // EntitySet functions return a $q.promise so that $q.all can be used in UI
      var packages    = new EntitySet({ EntityName: "packages",
                             GetFunction: ds.twcPackage.getPackages
                         });
      var lineups     = new EntitySet({ EntityName: "lineups",
                             AddFunction: ds.lineup.addLineup,
                             DeleteFunction: ds.lineup.deleteLineup,
                             GetFunction: ds.lineup.getLineups,
                             UpdateFunction: ds.lineup.updateLineup
                         });
      var groups      = new EntitySet({ EntityName: "groups",
                             AddFunction: ds.group.addGroup,
                             DeleteFunction: ds.group.deleteGroup,
                             GetFunction: ds.group.getGroups,
                             UpdateFunction: ds.group.updateGroup
                         });
      var subscribers = new EntitySet({ EntityName: "subscribers",
                             AddFunction: ds.subscriber.addSubscriber,
                             DeleteFunction: ds.subscriber.deleteSubscriber,
                             GetFunction: ds.subscriber.getSubscribers,
                             UpdateFunction: ds.subscriber.updateSubscriber
                         });

      var clearCache  = function() {
         ds.clearCache();
      };
      var updateUserSession = function () {
         var currentUser = amplify.store("CurrentUser");
         amplify.store("CurrentUser", currentUser, { expires: config.cacheExpiration });
      };

      // not page specific repositories
      // Todo: Provide a place for non-entity related Business calls?
      function Repository() {
         var getPackageChannels = function(serviceId, viewingArea) {
            updateUserSession();
            return $.Deferred(function (def) {
               ds.twcPackage.getPackageChannels({
               success: function (response) {
                  def.resolve(response);
               },
               error: function (error) {
                  logRestError("Repository", "getPackageChannels", error);
                  def.reject(error);
               }
               }, serviceId, viewingArea);
            }).promise();
         };
         return {
             getPackageChannels: getPackageChannels
         };
      }

      return {
         packages: packages,
         //            channels: channels,
         lineups: lineups,
         subscribers: subscribers,
         groups: groups,
         repository: new Repository(),
         clearCache: clearCache
      };
   }
);