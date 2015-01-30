// Karma configuration
// Generated on Fri Dec 06 2013 12:44:53 GMT-0500 (Eastern Standard Time)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
   files: [
      {pattern: 'libs/javascript-debug/*.js', included: false},
      {pattern: 'libs/toastr/*.js', included: false},
      {pattern: 'libs/amplify/lib/*.js', included: false},
      {pattern: 'libs/jquery/*.js', included: false},
      {pattern: 'libs/lodash/dist/*.js', included: false},
      {pattern: 'libs/angular/*.js', included: false},
      {pattern: 'libs/angular-resource/*.js', included: false},
      {pattern: 'libs/angular-route/*.js', included: false},
//      {pattern: 'libs/angular-sanitize/*.js', included: false},
      {pattern: 'libs/angular-mocks/*.js', included: false},
      {pattern: 'libs/bootstrap/dist/js/*.js', included: false},
      {pattern: 'directives/**/*.js', included: false},
      {pattern: 'routes/**/*.js', included: false},
      {pattern: 'controllers/**/*.js', included: false},
      {pattern: 'services/**/*.js', included: false},
      {pattern: 'test/**/*Spec.js', included: false},
      'test/mock/MockData.js',
      'app.js',
      'config.js',
      'test/test-main.js'
    ],


    // list of files to exclude
    exclude: [
        'main.js'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG, //.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
