/*

NOTE:

Unfortunately, we have to transpile all js to ES5 for now since uglify doesn't work on ES6 yet.

My methodology is "/build" is always the latest passing build and "/source" is always clean
ES6 code by the developer

Node doesn't support XMLHttpRequest's so I had to install a library (in dev dependencies)
that adds support for it. This library gets injected during the testing phase,
but is omitted in the build phase

*/

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
    grunt.initConfig({
		clean : {
			default : ['temp/*.js']
		},
		insert : {
			default : {
				src: 'test/reqs.js',
				dest: 'temp/go.js',
				match: '\/\/ {{Node Requirements}}'
			}
		},
		babel : {
			test : {
				files: {
	                'temp/go.js' : 'temp/go.js',
					'temp/go.test.js' : 'test/go.js'
	            }
			},
			build : {
				files: {
	                'build/go.js' : 'source/go.js'
	            }
			}
		},
		nodeunit : {
			files : ['temp/go.test.js']
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

	grunt.registerTask('default', ['clean', 'copy', 'insert', 'babel:test', 'nodeunit', 'babel:build', 'uglify', 'clean']);
};
