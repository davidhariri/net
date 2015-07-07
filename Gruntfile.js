module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	// TODO: When ES6 is standard remove Babel
    grunt.initConfig({
		babel: {
	        options: {
	            sourceMap: true
	        },
	        default: {
	            files: {
	                'build/go.js': 'source/go.js',
					'build/test.js' : 'test/test.js'
	            }
	        }
	    }
    });

	grunt.registerTask('default', ['babel']);
};
