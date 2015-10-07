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
	                'build/net.js' : 'source/net.js'
	            }
			}
		},
		copy : {
			default : {
				files : [
					{expand: false, src: ['source/net.js'], dest: 'temp/net.js'}
				]
			}
		},
		uglify : {
			default: {
				files: {
		        	'build/net.min.js': ['build/net.js']
				}
		    }
		}
    });

	grunt.registerTask('default', ['clean', 'copy', 'babel:build', 'uglify', 'clean']);
};
