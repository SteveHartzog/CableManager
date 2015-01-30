define(['config', 'amplify'], function (config, amplify) {
   'use strict';

   var debug = config.debug;

   var init = function () {
      amplify.request.define('GetChannels', 'ajax', {
          url: '/Api/GetMasterChannelList',
          dataType: 'json',
          type: 'GET'
      });

   };


   var getChannels = function (callbacks) {
      var result = amplify.store("Channels");
      if (result) {
          callbacks.success(result);
      } else {
          return amplify.request({
              resourceId: 'GetChannels',
              success: function (result){
                  if (result.Data && result.Data.Success === false) {
                      callbacks.error(result);
                  } else {
                      amplify.store("Channels", result, { expires: config.cacheExpiration });
                      callbacks.success(result);
                  }
              },
              error: function(error) {
                  debug.error("dataService.Channel(), line 25", error);
                  callbacks.error();
              }
          });
      }
   };

   var clearCache = function () {
      amplify.store('Channels', null);
   };

   init();

   return {
      getChannels: getChannels,
      clearCache: clearCache
   };
});