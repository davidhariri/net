/*

NOTE:

Unfortunately, we have to transpile all js to ES5 for now since uglify doesn't work on ES6 yet.

My methodology is "/build" is always the latest passing build and "/source" is always clean
ES6 code by the developer

*/
// TODO: Rename to Net

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
    grunt.initConfig({
		clean : {
			default : ['temp/*.js']
		},
		babel : {
			build : {
				files: {
	                'build/go.js' : 'source/go.js'
	            }
			}
		},
		copy : {
			default : {
				files : [
					{expand: false, src: ['source/go.js'], dest: 'temp/go.js'}
				]
			}
		},
		uglify : {
			default: {
				files: {
		        	'build/go.min.js': ['build/go.js']
				}
		    }
		}
    });

	grunt.registerTask('default', ['clean', 'copy', 'babel:build', 'uglify', 'clean']);
};
