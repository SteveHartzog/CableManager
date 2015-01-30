define(['config', 'amplify', 'mocks', 'services.utils'],
   function (config, amplify, mocks, utils) {
      'use strict';

      var debug = config.debug;

      var init = function () {
         if (config.useMocks) {
             amplify.request.define('GetSubscribers', function (settings) {
                 settings.success(false, mocks.subscribers);
             });
             amplify.request.define('AddOrUpdateSubscriber', function (settings) {
                 var subscriber = settings.data;
                 if (!subscriber.SubscriberID || subscriber.SubscriberID === 0) {
                     subscriber.SubscriberID = utils.randomFromInterval(300,600);
                 }
                 settings.success(false, subscriber);
             });
             amplify.request.define('DeleteSubscriber', function (settings) {
                 settings.success(false, 'Item deleted');
             });
         } else {
             amplify.request.define('AddOrUpdateSubscriber', 'ajax', {
                 url: config.apiUrl + 'customers/{CustomerID}/subscribers',
                 dataType: 'json',
                 type: 'PUT',
                 contentType: 'application/json; charset=utf-8',
                 dataMap: function (data) { return JSON.stringify(data); },
                 decoder: utils.statusDecoder
             });
             amplify.request.define('GetSubscribers', 'ajax', {
                 url: config.apiUrl + 'customers/{CustomerID}/subscribers',
                 dataType: 'json',
                 type: 'GET',
                 decoder: utils.statusDecoder
             });
             amplify.request.define('DeleteSubscriber', 'ajax', {
                 url: config.apiUrl + 'customers/{CustomerID}/subscribers/{SubscriberID}',
                 dataType: 'json',
                 type: 'DELETE',
                 contentType: 'application/json; charset=utf-8',
                 decoder: utils.statusDecoder
             });

            amplify.request.define('GetGroupLineups', 'ajax', {
               url: config.apiUrl + 'customers/{CustomerID}/lineups?group_id={GroupID}',
               dataType: 'json',
               type: 'GET',
               decoder: utils.statusDecoder
            });
            amplify.request.define('GetSubscriberLineups', 'ajax', {
               url: config.apiUrl + 'customers/{CustomerID}/lineups?subscriber_id={SubscriberId}',
               dataType: 'json',
               type: 'GET',
               decoder: utils.statusDecoder
            });

            amplify.request.define('AddSubscriberLineup', 'ajax', {
               url: config.apiUrl + 'customers/{CustomerID}/lineups/{LineupID}/assignments/?subscriber_id={SubscriberID}',
               dataType: 'json',
               type: 'PUT',
               contentType: 'application/json; charset=utf-8',
               dataMap: function (data) { return JSON.stringify(data); },
               decoder: utils.statusDecoder
            });
            amplify.request.define('DeleteSubscriberLineup', 'ajax', {
               url: config.apiUrl + 'customers/{CustomerID}/lineups/{LineupID}/assignments/?subscriber_id={SubscriberID}',
               dataType: 'json',
               type: 'DELETE',
               contentType: 'application/json; charset=utf-8',
               dataMap: function (data) { return JSON.stringify(data); },
               decoder: utils.statusDecoder
            });
         }
      };


      function addDerivedProperties (subscriber) {
         // TODO: Fix bug. Occasionally subscriber comes as an array instead of the actual object?
         try {
            subscriber.ViewingArea = subscriber.ViewingArea.toTitleCase();
         } catch (e) {
            subscriber = subscriber[0];
            subscriber.ViewingArea = subscriber.ViewingArea.toTitleCase();
         }
         return subscriber;
      }
      function getGroupLineups(groupId) {
         var storeName = "GroupLineups_" + groupId;
         var result = amplify.store(storeName);
         if (result) {
            return result;
         } else {
            amplify.request('GetGroupLineups', { CustomerID: config.customerId, GroupID: groupId },
               function (isError, result) {
                  if (isError) {
                     debug.error("ds.Subscriber.getGroupLineups(" + groupId + "): " + result);
                  } else {
                     amplify.store(storeName, result, { expires: config.cacheExpiration });
                     return result;
                  }
               }
            );
         }
      }
      function getSubscriberLineups(subscriberId) {
         var storeName = "SubscriberLineups_" + subscriberId;
         var result = amplify.store(storeName);
         if (result) {
            return result;
         } else {
            amplify.request('GetSubscriberLineups', { CustomerID: config.customerId, SubscriberId: subscriberId },
               function (isError, result) {
                  if (isError) {
                     debug.error("ds.Subscriber.getSubscriberLineups(" + subscriberId + "): " + result);
                  } else {
                     amplify.store(storeName, result, { expires: config.cacheExpiration });
                     return result;
                  }
               }
            );
         }      }
      function updateSubscriberLineups(subscriber) {
         var existingGroupLineups = [];
         if (subscriber.Group !== null && subscriber.Group.GroupId && subscriber.Group.GroupId > 0)
         {
            _.forEach(getGroupLineups(subscriber.Group.GroupId), function(lineup) {
               existingGroupLineups.push(lineup);
            });
         }

         var existingSubscriberLineups = [];
         _.forEach(getSubscriberLineups(subscriber.SubscriberId), function (lineup) {
            if (_.contains(existingGroupLineups, {LineupId: lineup.LineupId}))
            {
               existingSubscriberLineups.push(lineup);
            }
         });

         var lineupsToRemove = [];
         var lineupsToAdd = [];
         _.forEach(subscriber.Lineups, function (lineup) {
            if (!_.contains(existingSubscriberLineups, {LineupId: lineup.LineupId}) && !_.contains(existingGroupLineups, { LineupId: lineup.LineupId }))
            {
               lineupsToAdd.push(lineup.LineupId);
            }
         });
         _.forEach(existingSubscriberLineups, function (lineupId) {
            if (!_.contains(subscriber.Lineups, { LineupId: lineupId }))
            {
               lineupsToRemove.push(lineupId);
            }
         });

         try
         {
            _.forEach(lineupsToRemove, function (lineupId, subscriberId) {
               amplify.request('DeleteSubscriberLineup', { CustomerID: config.CustomerID, LineupID: lineupId, SubscriberID: subscriberId },
                  function (isError, result) {
                     if (isError) {
                        debug.error("ds.Subscriber.deleteSubscriberLineup())", result);
                     } else {
                        var storeName = "SubscriberLineups_" + subscriberId;
                        var subscriberLineups = amplify.store(storeName);
                        var foundLineup = _.filter(subscriberLineups, { 'LineupId' : lineupId });
                        var index;
                        if (foundLineup.length > 0) {
                           index = subscriberLineups.indexOf(foundLineup[0]);
                           subscriberLineups.splice(index, 1);
                           amplify.store(storeName, subscriberLineups, { expires: config.cacheExpiration });
                        }
                     }
                  }
               );
            });
            _.forEach(lineupsToAdd, function (lineupId, subscriberId) {
               amplify.request('AddSubscriberLineup', { CustomerID: config.CustomerID, LineupID: lineupId, SubscriberID: subscriberId },
                  function (isError, result) {
                     if (isError) {
                        debug.error("ds.Subscriber.addSubscriberLineup())", result);
                     } else {
                        var storeName = "SubscriberLineups_" + subscriberId;
                        var subscriberLineups = amplify.store(storeName);
                        subscriberLineups.push(lineupId);
                        amplify.store(storeName, subscriberLineups, { expires: config.cacheExpiration });
                     }
                  }
               );
            });
         }
         catch (e)
         {
            debug.Error("ds.Subscriber.updateSubscriberLineups(" + subscriber.SubscriberId + "): " + e);
         }
      }

      var getSubscribers = function (callbacks) {
         var result = amplify.store("Subscribers");
         if (result) {
            _.forEach(result, function(subscriber) {
               addDerivedProperties(subscriber);
            });
            callbacks.success(result);
         } else {
            return amplify.request('GetSubscribers', { CustomerID: config.customerId },
               function (isError, result){
                  if (isError) {
                     debug.error("ds.subscribers.getSubscribers(): " + result);
                     callbacks.error(result);
                  } else {
                     amplify.store("Subscribers", result, { expires: config.cacheExpiration });
                     _.forEach(result, function(subscriber) {
                        addDerivedProperties(subscriber);
                     });
                     callbacks.success(result);
                  }
               }
            );
         }
      };
      var deleteSubscriber = function (callbacks, id) {
         return amplify.request('DeleteSubscriber', { CustomerID: config.customerId, SubscriberID: id },
             function (isError, result) {
                 if (isError) {
                     debug.error("ds.subscribers.delete()", result);
                     callbacks.error(result);
                 } else {
                     var subscribers = amplify.store("Subscribers");
                     var foundSubscriber = _.filter(subscribers, { 'SubscriberId' : id });
                     var index;
                     if (foundSubscriber.length > 0) {
                         index = subscribers.indexOf(foundSubscriber[0]);
                         // remove the old item from the array
                         subscribers.splice(index, 1);
                         amplify.store("Subscribers", subscribers, { expires: config.cacheExpiration });
                     }
                     callbacks.success(result);
                 }
             }
         );
      };
      var addSubscriber = function (callbacks, subscriber) {
         subscriber.CustomerID = config.customerId;
         subscriber.ViewingArea = subscriber.ViewingArea.toLowerCase();
         return amplify.request('AddOrUpdateSubscriber', subscriber,
            function (isError, result) {
               if (isError) {
                  debug.error("ds.subscribers.add()", result);
                  callbacks.error(result);
               } else {
                  var savedSubscriber = result;
                  updateSubscriberLineups(savedSubscriber);

                  var subscribers = amplify.store("Subscribers");
                  subscribers.push(savedSubscriber);
                  amplify.store("Subscribers", subscribers, { expires: config.cacheExpiration });
                  callbacks.success(addDerivedProperties(savedSubscriber));
               }
            }
         );
      };
      var updateSubscriber = function (callbacks, subscriber) {
         subscriber.CustomerID = config.customerId;
         subscriber.ViewingArea = subscriber.ViewingArea.toLowerCase();
         return amplify.request('AddOrUpdateSubscriber', subscriber,
            function (isError, result) {
               if (isError) {
                  debug.error("ds.subscribers.update()", result);
                  callbacks.error(result);
               } else {
                  var subscriber = result;
                  updateSubscriberLineups(subscriber);

                  var subscribers = amplify.store("Subscribers");
                  var foundSubscriber = _.filter(subscribers, { 'SubscriberId' : subscriber.SubscriberId });
                  var index;
                  if (foundSubscriber.length > 0) {
                     index = subscribers.indexOf(foundSubscriber[0]);
                     // update groups array with the edited values
                     subscribers.splice(index, 1);
                     subscribers.push(subscriber);
                     amplify.store("Subscribers", subscribers, { expires: config.cacheExpiration });
                  }
                  callbacks.success(addDerivedProperties(subscriber));
               }
            }
         );
      };

      var clearCache = function () {
         amplify.store("Subscribers", null);
      };

      init();

      return {
         addSubscriber: addSubscriber,
         deleteSubscriber: deleteSubscriber,
         getSubscribers: getSubscribers,
         updateSubscriber: updateSubscriber,
         clearCache: clearCache
      };
    }
);

