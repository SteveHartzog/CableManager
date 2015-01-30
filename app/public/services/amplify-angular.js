define(['amplify', 'angular'],
    function(amplify, angular) {
        'use strict';
        var rurlData = /\{([^\}]+)\}/g;

        /**
         * Add request type for Angular's $http service
         *
         * @param defnSettings
         * @returns {Function}
         */
        amplify.request.types.$http = function(defnSettings) {
            //todo: make this configurable
            //todo: think : would this work where there are multiple angular.js applications on the same page
            var $http = angular.element('html').injector().get('$http');

            //setup defaults
            defnSettings = angular.extend({
                type: "GET",
                data: {},
                params: {}
            }, defnSettings );

            return function(settings, request) {
                var httpOptions, url, method, data, cacheSuccessful, getDecoder, httpSuccess, httpError, mapDataToUrl, dataMapping, checkCache, cacheKey,
                    setCacheData;

                //options for $http requests
                httpOptions = {
                    params: {}
                };

                url = defnSettings.url
                method = (defnSettings.dataType && defnSettings.dataType.toLowerCase() === 'jsonp' ? 'get' : defnSettings.type.toLowerCase());
                data = settings.data;
                cacheSuccessful = false;

                //todo: think: is the the best most unique way to generate the cache key?
                cacheKey = CryptoJS.SHA1(settings.resourceId + JSON.stringify(settings.data)).toString();

                /**
                 * See if the request has a decoder associated to it
                 *
                 * @param decoder
                 * @returns {*}
                 */
                getDecoder = function(decoder) {
                    if(angular.isFunction(decoder)) {
                        return decoder;
                    } else if(angular.isString(decoder)) {
                        if(!angular.isFunction(amplify.request.types.$http.decoders[decoder])) {
                            throw decoder + ' is not a valid data decoder';
                        }

                        return amplify.request.types.$http.decoders[defnSettings.decoder];
                    }

                    return;
                };

                /**
                 * Set data in the cache
                 *
                 * @param data
                 */
                setCacheData = function(data) {
                    var expires, storageLocation;
                    expires = {};

                    if(angular.isObject(defnSettings.cache)) {
                        expires = {expires: defnSettings.cache.expires};
                        storageLocation = defnSettings.cache.type;
                    } else if(angular.isNumber(defnSettings.cache)) {
                        expires = {expires: defnSettings.cache};
                    }

                    if(!storageLocation) {
                        amplify.store(cacheKey, data, expires);
                    } else {
                        amplify.store[storageLocation](cacheKey, data, expires);
                    }
                };

                /**
                 * Callback for successful $http request
                 *
                 * @param data
                 * @param status
                 * @param headers
                 * @param config
                 */
                httpSuccess = function(data, status, headers, config) {
                    var decoder = getDecoder(defnSettings.decoder);

                    //caching happens before decoding in order to make sure the decoders don't have to worry about caching
                    //todo: think: is there a way to cache the after decoding in order to improve preformance (if needed)
                    if(defnSettings.cache) {
                        setCacheData({
                            data: data,
                            status: status,
                            header: headers,
                            config: config
                        });
                    }

                    if(angular.isFunction(decoder)) {
                        decoder(data, status, settings.success, settings.error, headers, config);
                    } else {
                        settings.success(data, status, {
                            header: headers,
                            config: config
                        });
                    }
                };

                /**
                 * Callback for failed $http request
                 *
                 * @param data
                 * @param status
                 * @param headers
                 * @param config
                 */
                httpError = function(data, status, headers, config) {
                    var decoder = getDecoder(defnSettings.decoder);

                    if(angular.isFunction(decoder)) {
                        decoder(data, status, settings.success, settings.error, headers, config);
                    } else {
                        settings.error(data, status, {
                            headers: headers,
                            config: config
                        });
                    }
                };

                /**
                 * Convert the url to replace {...} with whatever data is passed to it
                 */
                mapDataToUrl = function() {
                    var mappedKeys = [];

                    if(typeof data === "string") {
                        return;
                    }

                    data = angular.extend(defnSettings.data, data);

                    url = url.replace(rurlData, function(m, key) {
                        if(key in data) {
                            mappedKeys.push(key);
                            return data[key];
                        }
                    });

                    // We delete the keys later so duplicates are still replaced
                    angular.forEach(mappedKeys, function(property) {
                        delete data[property];
                    });
                };

                /**
                 * Map the passed in data keys to other keys
                 */
                dataMapping = function() {
                    if(!defnSettings.dataMap || typeof data === "string") {
                        return;
                    }

                    if(angular.isFunction(defnSettings.dataMap)) {
                        data = defnSettings.dataMap(data);
                    } else {
                        angular.forEach(defnSettings.dataMap, function(replace, original) {
                            if(original in data) {
                                data[replace] = data[original];
                                delete data[original];
                            }
                        });
                    }
                };

                /**
                 * See if data is stored in the cache
                 *
                 * @returns {boolean}
                 */
                checkCache = function() {
                    var cachedData = amplify.store(cacheKey);

                    if(cachedData) {
                        //cache only happens on successful requests
                        httpSuccess(cachedData.data, cachedData.status, cachedData.headers, cachedData.config);
                        return true;
                    }

                    return false;
                };

                mapDataToUrl();
                dataMapping();

                //figure out the data that should be included in the params
                if(method === 'get') {
                    httpOptions.params = data;
                    data = {};

                    if(defnSettings.dataType && defnSettings.dataType.toLowerCase() === 'jsonp') {
                        //todo: is there a way to generate a callback that does not use the angular.callbacks._0 as it might be be compatible with all REST APIs
                        httpOptions.params.callback = 'JSON_CALLBACK';
                        method = 'jsonp';
                    }
                }

                if(defnSettings.cache) {
                    cacheSuccessful = checkCache();
                }

                //perform the $http request if we did not load from cache
                if(cacheSuccessful !== true) {
                    if(method === 'post') {
                        $http[method](url, data, httpOptions).success(httpSuccess).error(httpError);
                    } else {
                        $http[method](url, httpOptions).success(httpSuccess).error(httpError);
                    }
                }
            };
        };

        /**
         * Decoders for $http requests
         *
         * @type {}
         */
        amplify.request.types.$http.decoders = {
            //jsend compatible decoder
            jsend: function(response, status, success, error, headers, config) {
                var message = (response.message ? response.message : undefined);

                if(response.status === 'success') {
                    success(response.data, status, {
                        message: message,
                        headers: headers,
                        config: config
                    });
                } else {
                    var data = (angular.isDefined(response.errors) ? response.errors : response.data);

                    //add the error code to the data if present
                    if(angular.isDefined(response.code)) {
                        data.code = response.code
                    }

                    error(data, response.status, {
                        message: message,
                        headers: headers,
                        config: config
                    });
                }
            }
        };
    }
);