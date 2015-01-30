define(['config', 'amplify', 'mocks', 'services.utils'],
   function (config, amplify, mocks, utils) {
      'use strict';

      var debug = config.debug;

      var init = function () {
         if (config.useMocks) {
            amplify.request.define('GetPackages', function (settings) {
               settings.success(false, mocks.packages);
            });

            amplify.request.define('GetPackageChannels', function (settings) {
               settings.success(false, mocks.packageChannels(settings.data.ViewingArea, settings.data.PackageID));
            });

         } else {

            amplify.request.define('GetPackages', 'ajax', {
               url: config.apiUrl + 'customers/' + config.customerId + '/packages',
               dataType: 'json',
               type: 'GET',
               decoder: utils.statusDecoder
            });

            amplify.request.define('GetPackageChannels', 'ajax', {
               url: config.apiUrl + 'customers/' + config.customerId + '/channels?package_id={PackageID}&viewing_area={ViewingArea}',
               dataType: 'json',
               type: 'GET',
               contentType: 'application/json; charset=utf-8',
               decoder: utils.statusDecoder
            });

//            amplify.request.define('GetChannels', 'ajax', {
//               url: config.apiUrl + 'customers/' + config.customerId + '/channels?package_id={PackageID}/&viewing_area={ViewingArea}',
//               dataType: 'json',
//               type: 'GET',
//               contentType: 'application/json; charset=utf-8',
//               decoder: utils.statusDecoder
//            });
         }
      };

      function BuildPackageArrays(allPackageArray) {
         var packages = {
            privatePackages: [],
            publicPackages: [],
            commonPackages: []
         };

         _.forEach(allPackageArray, function (customerPackage) {
            customerPackage.Children = _.filter(allPackageArray, { ParentPackageId: customerPackage.PackageId, ViewingArea: customerPackage.ViewingArea });
            switch (customerPackage.ViewingArea) {
               case "private":
                  packages.privatePackages.push(customerPackage);
                  break;
               case "public":
                  packages.publicPackages.push(customerPackage);
                  break;
               case "common":
                  packages.commonPackages.push(customerPackage);
                  break;
            }
         });
         return packages;
      }

      var getPackages = function (callbacks) {
         var result = amplify.store("Packages");
         if (result) {
               callbacks.success(result);
         } else {
            return amplify.request('GetPackages', { CustomerID: config.customerId },
               function (isError, result) {
                  if (isError) {
                     debug.error("ds.package(): ", result);
                     callbacks.error(result);
                  } else {
                     var allPackageArray = new BuildPackageArrays(result);
                     amplify.store("Packages", allPackageArray, { expires: config.cacheExpiration });
                     callbacks.success(allPackageArray);
                  }
               }
            );
         }
      };

      var getPackageChannels = function (callbacks, packageId, viewingArea) {
         var storeName = "PackageChannels_" + packageId + "_" + viewingArea;
         var result = amplify.store(storeName);
         if (result) {
            callbacks.success(result);
         } else {
            amplify.request("GetPackageChannels",
               {
                  PackageID: packageId,
                  ViewingArea: viewingArea.toLowerCase()
               },
               function (isError, result) {
                  if (isError) {
                     debug.error("ds.Package.getPackageChannels(): " + result);
                     callbacks.error(result);
                  } else {
                     amplify.store(storeName, result, { expires: config.cacheExpiration });
                     callbacks.success(result);
                  }
               }
            );
         }
      };

        var clearCache = function () {
            amplify.store("Packages", null);
        };

        init();

        return {
            init: init,
            getPackages: getPackages,
            getPackageChannels: getPackageChannels,
            clearCache: clearCache
        };
    });

