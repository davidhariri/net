// NOTE: My methodology is "/build/go.js" is always the latest passing build
// NOTE: I achieve this by making sure all tests pass before putting anything in /build
// NOTE: I treat /temp as a kind of quarantine area until I'm sure the library is good to ship
// NOTE: We have to transpile all js to ES5 for now since uglify doesn't work on ES6 yet
// 		 In the future I'd like to be able to build two different versions
// 		 In the future future I'd like to be able to remove all this crap and just have it run natively in ES6 syntax :-)


/*

We have to transpile all js to ES5 for now since uglify doesn't work on ES6 yet
My methodology is "/build" is always the latest passing build and "/source" is always clean
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
