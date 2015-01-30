define(['angular', 'app', 'security', 'mocks', 'angular-mocks', 'angular-resource', 'angular-route'], function (angular, app, security, mockData) {
   'use strict';
   describe('Security:', function() {
      var app, module;

      // mock security factory to allow us to inject our own dependencies
      beforeEach(function () {
         app = angular.module('app');
         module = angular.module('security');
      });

//      // set currentUser and pass to security
//      config.currentUser = mockData.user;
//      beforeEach(function () {
//         module(function ($provide) {
//            $provide.value('config', config);
//         });
//      });

      it('can get an instance of the security factory', inject(['security', function(security) {
         expect(security).toBeDefined();
      }]));

      it('gets current user', inject(function(_$httpBackend_) {
         var mockBackend = _$httpBackend_;
         mockBackend.expectGET('/security/currentUser').respond(mockData.user);

         var currentUser = security.requestCurrentUser();
         expect(currentUser.Email).toBe(mockData.user.Email);
      }));

   });
});