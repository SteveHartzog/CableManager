define(['angular', 'app', 'angular-mocks'], function (angular, app, angularMocks) {
   'use strict';

   describe("Modules:", function() {
      describe("app:", function() {

         var module;
         beforeEach(function() {
            module = angular.module("app");
         });

         it("should be registered", function() {
            expect(module).not.toBe(null);
         });

         describe("Dependencies:", function() {

            var deps;
            var hasModule = function(m) {
               return deps.indexOf(m) >= 0;
            };
            beforeEach(function() {
               deps = module.value('app').requires;
            });

            //you can also test the module's dependencies
            it("should have controllers as a dependency", function() {
               expect(hasModule('controllers')).toBe(true);
            });

            it("should have directives as a dependency", function() {
               expect(hasModule('directives')).toBe(true);
            });

            it("should have services as a dependency", function() {
               expect(hasModule('services')).toBe(true);
            });

            it("should have security as a dependency", function() {
               expect(hasModule('security')).toBe(true);
            });

         });
      });
   });
});