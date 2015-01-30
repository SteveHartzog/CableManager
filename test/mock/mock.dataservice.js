define('service.data.service', ['../.'],
    function (amplify) {
        var defineApi = function (model) {

			//#region Internal Controller calls
            // Admin
            amplify.request.define('UpdateChannel', function (settings) {
                settings.success(model.UpdateChannel().channels);
            });

            // SaveAccountSettings
            amplify.request.define('UpdateAdminUser', function (settings) {
                settings.success(model.UpdateChannel().channels);
            });

            // signout
            amplify.request.define('SignOut', function (settings) {
                settings.success(model.SignOut().channels);
            });

            // GetCustomerDetails
            amplify.request.define('GetCustomerDetails', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            // Get All Viewing Areas
            amplify.request.define('GetViewingAreas', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            //Get all Channel List
            amplify.request.define('GetChannels', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            // Services
            amplify.request.define('GetAllServices', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('GetChannelsForService', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            //Renew Password
            amplify.request.define('RenewPassword', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            //Packages
            amplify.request.define('GetAllPackages', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            //lineups
            amplify.request.define('GetAllLineups', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('AddLineup', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('UpdateLineup', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('GetLineupById', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('DeleteLineup', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('GetLineupChannels', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('GetGroupsForLineup', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            //user
            amplify.request.define('GetAllUser', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('GetUserById', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('AddUser', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('DeleteUser', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('UpdateUserDetail', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            //usergroups
            amplify.request.define('GetAllUserGroup', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('GetUserGroupById', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('AddUserGroup', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('UpdateUserGroupDetail', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('DeleteUserGroup', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('GetLineupsForGroup', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('GetUsersForGroup', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('GetStartupChannel', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });

            amplify.request.define('GetLineupsForUser', function (settings) {
                settings.success(model.GetCustomerDetails().customer);
            });
        	//#endregion

        	//#region External WebAPI Calls
			// Admin Users
            amplify.request.define('AuthenticateUser', function (settings) {
            	settings.success(model.AuthenticateUser());
            });
            amplify.request.define('AdminUser', function (settings) {
            	settings.success(model.AdminUser());
            });

        	// Channels
            amplify.request.define('PostChannels', function (settings) {
            	settings.success(model.PostChannels());
            });
            amplify.request.define('GetAllChannels', function (settings) {
            	settings.success(model.GetAllChannels());
            });
            amplify.request.define('GetAllCustomerChannels', function (settings) {
            	settings.success(model.GetAllCustomerChannels());
            });
            amplify.request.define('SetCustomerChannelNumber', function (settings) {
            	settings.success(model.SetCustomerChannelNumber());
            });

			// Client Configurations
            amplify.request.define('GetClientConfiguration', function (settings) {
            	settings.success(model.GetClientConfigurations());
            });
            amplify.request.define('VerifyParameters', function (settings) {
            	settings.success(model.VerifyParameters());
            });
            amplify.request.define('GetClientIp', function (settings) {
            	settings.success(model.GetClientIp());
            });

        	// Customer External IPs
            amplify.request.define('GetExternalIPs', function (settings) {
            	settings.success(model.GetExternalIPs());
            });
            amplify.request.define('SetExternalIPs', function (settings) {
            	settings.success(model.SetExternalIPs());
            });

        	// Customer Internal IPs
            amplify.request.define('GetInternalIPs', function (settings) {
            	settings.success(model.GetExternalIPs());
            });
            amplify.request.define('SetInternalIPs', function (settings) {
            	settings.success(model.SetExternalIPs());
            });

			// Customer Packages (aka services)
            amplify.request.define('GetCustomerPackages', function (settings) {
            	settings.success(model.GetCustomerPackages());
            });
            amplify.request.define('GetCustomerPackage', function (settings) {
            	settings.success(model.GetCustomerPackage());
            });

        	// Customers

        	// Entitlements

        	// Groups

        	// Lineup Assignments

        	// Lineups Channels

        	// Lineups

        	// Packages Assignments

        	// Packages Channels

        	// Packages

        	// Users

        	// Users Devices

			// Values

			// Template
            //amplify.request.define('', function (settings) {
            //	settings.success(model.())
            //});

        	//#endregion

            };

        var getAllServices = function (callbacks) {
                return amplify.request({
                    resourceId: 'services',
                    success: callbacks.success,
                    error: callbacks.error
                });
            };

//        var updateSession = function (callbacks, data) {
//                return amplify.request({
//                    resourceId: 'sessionUpdate',
//                    data: data,
//                    success: callbacks.success,
//                    error: callbacks.error
//                });
//            };

        init();

        return {
            defineApi: defineApi
        };
    });