module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	
    grunt.initConfig({
		babel : {
			build : {
				files: {
	                'build/net.js' : 'source/net.js',
	                'build/tests.js' : 'source/tests.js'
	            }
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

	grunt.registerTask('default', ['babel:build', 'uglify']);
};
