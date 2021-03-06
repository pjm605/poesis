var path = require('path');

module.exports = function (config) {

    var filesCollection = [
        'node_modules/lodash/lodash.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-messages/angular-messages.js',
        'node_modules/codemirror/lib/codemirror.js',
        'node_modules/codemirror/mode/commonlisp/commonlisp.js',
        'node_modules/angular-ui-codemirror/src/ui-codemirror.js',
        'public/js/bundle.js',
        'node_modules/sinon/pkg/sinon.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'tests/browser/**/*.js'
    ];

    var excludeFiles = [
        'tests/browser/karma.conf.js'
    ];

    var configObj = {
        browsers: ['Chrome'],
        frameworks: ['mocha', 'chai'],
        basePath: path.join(__dirname, '../../'),
        files: filesCollection,
        exclude: excludeFiles,
        reporters: ['mocha', 'coverage'],
        preprocessors: {
            'public/js/bundle.js': 'coverage'
        },
        coverageReporter: {
            dir: 'coverage/browser/',
            reporters: [{
                type: 'text',
                subdir: '.'
            }, {
                type: 'html',
                subdir: '.'
            }]
        }
    };

    config.set(configObj);

};