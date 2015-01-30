define(['config', 'lodash'], function (config, _) {
    "use strict";

    var toastr = config.toastr;
    var toasts = config.messages;
    var errors = config.errors;

    var hasProperties = function(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return true;
            }
        }
        return false;
    };

    String.prototype.toTitleCase = function () {
        return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };

   var statusDecoder = function (data, status, xhr, response) {
       if (xhr.status === 200) {
         response(false, data);
      } else {
         var errorText = "";
         try { // check for amplify exception (this means the server didn't respond)
            errorText = JSON.parse(xhr.responseText).MessageDetail;
         } catch (exception) {
            errorText = xhr.responseText;
            if (errorText === undefined || errorText.length === 0) {
               errorText = xhr.statusText;
            }
         }
         response(true, errorText);
      }
   };

    var randomFromInterval = function(from,to)
    {
        return Math.floor(Math.random()*(to-from+1)+from);
    };

    var handleError = function(options) {
        var error = options.error;
        var security = options.security;
        var dc = options.dataContext;

        switch (error) {
            case undefined:
            case null:
                toastr.error("Unknown error has occurred. Please try again.");
                break;
            case (errors.noResponse):
//                debug.error(errors.noResponse);
                toastr.error(toasts.notReachable);
                break;
            case (errors.initialLogin):
                security.showLogin();
                break;
            case (errors.userNotAuthenticated):
//                debug.error(toasts.sessionExpired);
                toastr.warning(toasts.sessionExpired);
                if (dc) {
                    dc.clearCache();
                }
                security.showLogin();
                break;
            case (errors.errorDeletingData):
//                debug.error(error);
                toastr.error(toasts.errorDeletingData);
                break;
            case (errors.userNotAuthorized):
//                debug.error(errors.permissionRequired);
                toastr.warning(toasts.userNotAuthorized)
                if (dc) {
                    dc.clearCache();
                }
                security.showLogin();
                break;
            default:
//                debug.error(error);
                toastr.error(error);
        }
    };

    var invokeFunctionIfExists = function (callback) {
            if (_.isFunction(callback)) {
                callback();
            }
        };

    var regExEscape = function(text) {
        // Removes regEx characters from search filter boxes in our app
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

    return {
        handleError: handleError,
        hasProperties: hasProperties,
        invokeFunctionIfExists: invokeFunctionIfExists,
        randomFromInterval: randomFromInterval,
        regExEscape: regExEscape,
       statusDecoder: statusDecoder
    };
});

