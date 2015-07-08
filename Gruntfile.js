// 1: Clean the /temp and /build dirs
// 2: Convert and move test and source to /temp for ES5 compatibility
// 3: Run our tests
// 4: Build source, map, and minified version from ES5 in /temp and from /source (both ES6 and ES5 libraries)
// 5: Check size against 16kb
// 6: Clean the /temp and /build dirs

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	// TODO: When ES6 is standard remove Babel
    grunt.initConfig({
		clean : {
			default : ['temp/*.js']
		},
		babel : {
			default : {
				files: {
	                'temp/go.es5.js': 'source/go.js',
					'temp/go.test.es5.js': 'test/go.js',
	            }
			}
		},
		nodeunit : {
			files : ['temp/go.test.es5.js']
		}
    });

	grunt.registerTask('default', ['clean', 'babel', 'nodeunit', 'clean']);
};
