// NOTE: My methodology is "/build/go.js" is always the latest passing build
// NOTE: I achieve this by making sure all tests pass before putting anything in /build
// NOTE: I treat /temp as a kind of quarantine
// NOTE: Below are my instructions:

// 1: Clean the /temp and /build dirs
// 2: Copy the source/go.js to /temp/go.js for dependencies, transpiling, testing etc...
// 3: Run our tests in the temp folder
// 4: Copy over our library once all tests have passed to /build/go.js
// 5: Minifiy /build/go.js to /build/go.min.js
// 5: Clean the /temp and /build dirs

// NOTE: We have to transpile all js to ES5 for now since uglify doesn't work on ES6 yet
// NOTE: In the future I'd like to be able to build two different versions
// NOTE: In the future future I'd like to be able to remove all this crap and just have it run natively in ES6 syntax :-)

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
