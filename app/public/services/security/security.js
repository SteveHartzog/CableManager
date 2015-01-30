define(['config', 'dataService', 'amplify', 'mocks', 'security.retryQueue', 'security.login', 'ui.bootstrap.dialog'],
    function (config, ds, amplify, mocks) {
        'use strict';

        var debug = config.debug;

        // Based loosely around work by Witold Szczerba - https://github.com/witoldsz/angular-http-auth
        angular.module('security.service', [
            'security.retryQueue',    // Keeps track of failed requests that need to be retried once the user logs in
            'security.login',         // Contains the login form template and controller
            'ui.bootstrap.dialog'     // Used to display the login form as a modal dialog.
        ])

        .factory('security', ['$rootScope', '$http', '$q', '$location', 'securityRetryQueue', '$dialog',
            function($rootScope, $http, $q, $location, queue, $dialog) {
                // Redirect to the given url (defaults to '/')
                function redirect(url) {
                    url = url || '/';
                    $location.path(url);
                }

                // Login form dialog stuff
                var loginDialog = null;
                function openLoginDialog() {
                    if ( loginDialog ) {
                      throw new Error('Trying to open a dialog that is already open!');
                    }
                    ds.clearCache();
                    loginDialog = $dialog.dialog();
                    loginDialog.open('services/security/login/login.html', 'loginForm').then(onLoginDialogClose);
                }
                function closeLoginDialog(success) {
                    if (loginDialog) {
                        loginDialog.close(success);
                    }
                }
                function onLoginDialogClose(success) {
                    loginDialog = null;
                    if ( success ) {
                        ds.clearCache();
                        queue.retryAll();
                    } else {
                        queue.cancelAll();
                        redirect();
                    }
                }

                // Register a handler for when an item is added to the retry queue
                queue.onItemAddedCallbacks.push(function(retryItem) {
                    if ( queue.hasMore() ) {
                        service.showLogin();
                    }
                });

                // The public API of the service
                var service = {
                    // Get the first reason for needing a login
                    getLoginReason: function() {
                        return queue.retryReason();
                    },

                    // Show the modal login dialog
                    showLogin: function() {
                        openLoginDialog();
                    },

                    // Attempt to authenticate a user by the given email and password
                    login: function(user, pw) {
                       debug.log("security.login called", user);
                       var request;
                       if (config.useMocks) {
                           request = $q.when({data: mocks.user});
                       } else {
                          $http.defaults.useXDomain = true;
                          request = $http.post(config.apiUrl + 'Security/Login', {email: user, password: pw});
                       }
                       return request.then(function(response) {
                          if (typeof(response.data) !== "string") {
                             debug.log("security.login response", response.data);
                             service.currentUser = response.data;
                             amplify.store("CurrentUser", service.currentUser, { expires: config.cacheExpiration });
                          } else {
                             debug.log("security.login response", response);
                             amplify.store("CurrentUser", null);
                             service.currentUser = null;
                          }
                          var isAuthenticated = service.isAuthenticated();
                          if (isAuthenticated) {
                             closeLoginDialog(true);
                          }
                          return isAuthenticated;
                       }, function (error) {
                          debug.log(error);
                       });
                    },

                    // Give up trying to login and clear the retry queue
                    cancelLogin: function() {
                      closeLoginDialog(false);
                      redirect();
                    },

                    // Logout the current user and redirect
                    logout: function() {
//                        debug.log("security.logout calling api/logout");
                        $rootScope.Customer = undefined;
                        $rootScope.isLineupsCached = undefined;
                        $rootScope.isSubscribersCached = undefined;
                        $rootScope.isGroupsCached = undefined;
                        $rootScope.isDashboardCached = undefined;

                        ds.clearCache();
//                        if (!config.useMocks) {
//                           $http.defaults.useXDomain = true;
//                           $http.post('/security/logout').then(function() {
//                                service.currentUser = null;
//                                redirect(redirectTo);
//                            });
//                        } else {
                          amplify.store("CurrentUser", null);
                          service.currentUser = undefined;
                          redirect();
                          openLoginDialog();
//                        }
                    },

                    // Ask the backend to see if a user is already authenticated - this may be from a previous session.
                    requestCurrentUser: function() {
                        debug.log("requestCurrentUser called");
                        if ( service.isAuthenticated() ) {
                            return $q.when(service.currentUser);
                        } else {
                            debug.log("calling /security/currentUser");
                            if (config.useMocks) {
                                return $q.when(function () {
                                    service.currentUser = "User not authenticated.";
                                });
                            }else {
                                // since currentUser was null, let's check the browser store
                                service.currentUser = amplify.store("CurrentUser");
                               // if the user was in the browser store, and hasn't expired
                               if (service.currentUser !== undefined && service.currentUser !== null) {
//                                  $http.defaults.useXDomain = true;
//                                  $http.defaults.headers = { 'ASP.NET_SessionId': service.currentUser.SessionID };
//                                  $http.defaults.withCredentials = true;
//                                  return $http.get(config.apiUrl + 'security/currentUser').then(function(response) {
//                                     var user = response.data;
//                                     debug.log('/security/currentUser', user);
//                                     if (typeof(user) !== "string") {
//                                        service.currentUser = user;
//                                        return user;
//                                     } else {
//                                        service.currentUser = null;
//                                     }
//                                  });
                                  return $q.when(service.currentUser);
                               } else {
//                                  // else the user has never authenticated, or the browser store cache expired
                                  return $q.when(function () {
                                     service.currentUser = "User not authenticated.";
                                  });
                               }
                            }
                        }
                    },

                    // Information about the current user
                    currentUser: null,

                     // Is the current user authenticated?
                     isAuthenticated: function(){
                          debug.log("isAuthenticated: " + !!service.currentUser);
                           return !!service.currentUser;
                     },

                    // Is the current user an adminstrator?
                    isAdmin: function() {
                        return !!(service.currentUser && service.currentUser.admin);
                    }
                };
                return service;
            }
        ]);
    }
);