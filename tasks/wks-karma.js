
var extend = require('extend');
var childProcess = require('child_process');

module.exports = function(grunt) {
    
    /**
     * Karma Runner Utility
     * it extract all linked javascript in `index.html` and run through Karma
     */
    grunt.registerTask('wks-karma', 'build the full js stack to run under karma', function() {
        var source = grunt.file.read('build/debug/index.html');
        
        // extract scripts form index.html
        var paths = [];
		source.replace(/<script\s+src="([^"]*)"\s*><\/script>/g, function (match, href) {
            if (href.indexOf('./') !== -1) {
                paths.push(href.replace('./', 'build/debug/'));
            }
		});
        
        // add code coverage preprocesso in test
        paths.forEach(function(path) {
            grunt.config.data.karma['wks-test'].options.preprocessors[path] = ['coverage'];
        });
        
        paths.push('src/features/**/specs/**/*.spec.js');
        paths.push('src/modules/**/specs/**/*.spec.js');
        grunt.config.data.karma['wks-test'].options.files = paths;
        grunt.config.data.karma['wks-ci'].options.files = paths;
    });
    
    grunt.registerTask('wks-install-karma', 'install karmajs dependencies', function() {
        var cl = childProcess.exec('npm install grunt-karma@0.8.x karma@0.12.x karma-chrome-launcher@0.1.x karma-jasmine@0.1.x karma-mocha@0.1.x karma-firefox-launcher@0.1.x karma-safari-launcher@0.1.x karma-phantomjs-launcher@0.1.x karma-chai@0.1.x karma-opera-launcher@0.1.x karma-coverage@0.2.x karma-sinon@1.0.x karma-osx-reporter@0.0.x karma-growl-reporter@0.1.x mocha@1.18.x chai@1.9.x sinon@1.9.x --save-dev', function() {});
        cl.on('exit', this.async());
        cl.stdout.on('data', function(data) {
            process.stdout.write(data);
        });
    });
    
};
