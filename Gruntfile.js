// 1: Clean the /temp and /build dirs
// 2: Convert and move test and source to /temp for ES5 compatibility
// 3: Run our tests
// 4: Build source, map, and minified version from ES5 in /temp and from /source (both ES6 and ES5 libraries)
// 5: Clean the /temp and /build dirs

// Note: Have to transpile all to ES5 for now since uglify doesn't work on ES6 yet

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	// TODO: When ES6 becomes the standard remove Babel and all that jank below
    grunt.initConfig({
		clean : {
			default : ['temp/*.js']
		},
		babel : {
			default : {
				files: {
	                'temp/go.js': 'source/go.js',
					'temp/go.test.js': 'test/go.js',
	            }
			}
		},
		nodeunit : {
			files : ['temp/go.test.js']
		},
		copy : {
			default : {
				files : [
					{expand: false, src: ['temp/go.js'], dest: 'build/go.js'}
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

	grunt.registerTask('default', ['clean', 'babel', 'nodeunit', 'copy', 'uglify', 'clean']);
};
