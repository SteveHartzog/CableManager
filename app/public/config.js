define('config', ['toastr', 'debug'],
    function (toastr, debug) {
        'use strict';

        var DEBUG = true;
        var useMocks = true; // Set this to toggle mocks

        toastr.options.timeOut = 2000;
        toastr.options.positionClass = 'toast-bottom-right';

        // future
        // var apiUrl = "https://twctvapi.dev.twc.mpscust.com/";

        // server
        // var apiUrl = "https://customer.dev.twc.mpscust.com/";

        // local dev
//       var apiUrl = "http://localhost:53802/";
       var apiUrl = "http://localhost:62286/";
        var customerId = "Wake Forest University";

        var debugOption;
        if (DEBUG) {
            // assign Ben Alman's console.log wrapper
            debugOption = debug;
        } else {
            // override debug module
            debugOption = {
                group: function (){},
                groupEnd: function (){},
                time: function (){},
                log: function (){},
                debug: function (){},
                error: function (){},
                info: function (){},
                success: function (){},
                warning: function (){}
            };
        }

        // TODO: Add angular constant for messages.
        var messages = {
            changesPending: 'Please save or cancel your changes before leaving the page.',
            dataLoaded: "Data loaded.",
            invalidRoute: 'Cannot navigate. Invalid route.',
            retrievedData: 'Data retrieved successfully.',
            savedData: 'Data saved successfully.',
            sessionExpired: 'Your login session has timed out.',
            notReachable: 'The server is not reachable. Please try again later.',
            permissionRequired: "Page requires additional permissions, please login with another account."
        };

        // TODO: Add angular constant for errors.
        var errors = {
            errorSavingData: 'Data could not be saved. Please check the logs.',
            errorGettingData: 'Could not retrieve data.  Please check the logs.',
            errorDeletingData: 'Could not delete data. Please check the logs.',
            errorSessionTimeout: 'User session timed out.',
            initialLogin: "User must login to use this app.",
            invalidCredentials: 'Login failed.  Please check your credentials and try again.',
            noResponse: "One or more errors occurred.",
            notAuthorized: 'You do not have the necessary access permissions. Do you want to login as someone else?',
            notAuthenticated: 'You must be logged in to access this part of the application.',
            serverError: 'There was a problem with authenticating: {{exception}}.',
            userNotAuthenticated: "User not authenticated.",
            userNotAuthorized: "User not authorized."
        };
//       $scope.GroupsEmptyMessage = ($scope.lineups.length === 0)
//          ? "There are currently no groups available."
//          : "Your search didn't match any groups.";
//       $scope.GroupLineupAvailableText = "Available Service Licenses";

        // 30m: 1.8m
        // 20m: 1.2m -> default aspnet session timeout
        // 15m: 900k
        var cacheExpiration = 1200000; // 20 minutes
        var sessionExpiration = 1200000; // 20 minutes

        return {
            apiUrl: apiUrl,
            customerId: customerId,
            cacheExpiration: cacheExpiration,
            sessionExpiration: sessionExpiration,
            debug: debugOption,
            errors: errors,
            messages: messages,
            toastr: toastr,
            useMocks: useMocks,
            window: window
        };
    });

