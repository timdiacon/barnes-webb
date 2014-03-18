module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// INIT
		bowerInstall: {
	    	target: {
	    		src: 'dev/index.html'
	    	}
	    },

		// DEV
		compass: {
			dist: {
				options: {
					sassDir: 'dev/sass',
					cssDir: 'dev/css',
					environment: 'production'
				}
			},
			dev: {
				options: {
					sassDir: 'dev/sass',
					cssDir: 'dev/css'
				}
			}
		},

		watch: {
			css: {
				files:'dev/sass/*.scss',
				tasks:'compass:dev'
			}
		},
		
		// BUILD
	    useminPrepare: {
    		html: 'dev/index.html',
    		options: {
    			root: 'dev',
    			dest: 'build'
    		}
    	},

    	usemin: {
    		html: ['build/index.html']
    	},


		copy: {
			main: {
				files:[
					{expand: true, flatten:true, src: ['dev/index.html'], dest: 'build/', filter: 'isFile'}
				]
			}
		}

	});

	// watch during dev
	grunt.registerTask('default',['bowerInstall', 'compass:dev', 'watch:css']);
	// build that shit
	grunt.registerTask('build', ['bowerInstall', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'copy:main', 'usemin']);

	// TODO clean, html-min, min-versioning
};