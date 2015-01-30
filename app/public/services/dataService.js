define(['config', 'dataService.Package', 'dataService.Channel', 'dataService.Lineups', 'dataService.Groups', 'dataService.Subscribers'],
    function (config, twcPackage, channel, lineup, group, subscriber) {
        'use strict';

        config.debug.log("dataService loaded.");

        var clearCache = function() {
            twcPackage.clearCache();
            channel.clearCache();
            lineup.clearCache();
            group.clearCache();
            subscriber.clearCache();
        };

        return {
            twcPackage: twcPackage
            , channel: channel
            , lineup: lineup
            , group: group
            , subscriber: subscriber
            , clearCache: clearCache
        };
//    });
     }
);