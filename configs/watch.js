var extend = require('extend');

function configWatch(grunt) {
    if (!grunt.config.data.watch) {
        grunt.config.data.watch = {};
    }
    
    
    /**
     * Configure WATCH task for karma-ci
     */
    grunt.config.data.watch = extend(true, {
        'wks-ci' : {
            files: ['build/debug/**/*', 'src/**/*.spec.js'],
            tasks: [
                'wks-karma',
                'karma:wks-ci:run',
            ],
            options: {
                spawn: false
            }
        },
        wkd : {
            files: ['Gruntfile.js', 'src/**/*'],
            tasks: ['build'],
            options: {
                spawn: false,
                livereload: true
            }
        }
    }, grunt.config.data.watch);

}

module.exports = configWatch;