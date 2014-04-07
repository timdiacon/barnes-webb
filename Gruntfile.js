module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// INIT
		bowerInstall: {
	    	target: {
	    		src: 'dev/index.html',
	    		exclude: ['slick-carousel']
	    	}
	    },

		// DEV
		compass: {
			dist: {
				options: {
					sassDir: 'dev/sass',
					cssDir: 'dev/css',
					environment: 'production',
					require: ['animation']
				}
			},
			dev: {
				options: {
					sassDir: 'dev/sass',
					cssDir: 'dev/css',
					require: ['animation']
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
		clean: ["build"],

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

    	imagemin: {
    		options: {
    			cache: false
    		},
    		build: {
    			files: [{
    				expand: true,
    				cwd: 'dev/img',
    				src: ['**/*.{png,jpg,gif}'],
    				dest: 'build/img'
    			}]
    		}
    	},

    	htmlmin: {
    		dist: {
    			options: {
    				removeComments: true,
    				collapseWhitespace: true
    			},
    			files: {
    				'build/index.html': 'build/index.html'
    			}
    		},
    	},

    	rev: {
    		files: {
    			src: ['build/js/scripts.min.js', 'build/css/style.min.css']
    		}
    	},

		copy: {
			main: {
				files:[
					{expand: true, flatten:true, src: ['dev/index.html'], dest: 'build/', filter: 'isFile'},
					{expand: true, flatten:true, src: ['dev/img/*.svg'], dest: 'build/img', filter: 'isFile'},
					{expand: true, flatten:true, src: ['dev/Barnes-and-Webb-Guidebook.pdf'], dest: 'build/', filter: 'isFile'}
				]
			}
		}

	});

	// watch during dev
	grunt.registerTask('default',['compass:dev', 'watch:css']);
	// build that shit
	grunt.registerTask('build', ['clean', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'copy:main', 'rev', 'usemin', 'htmlmin', 'imagemin']);
	// bower
	grunt.registerTask('bower',['bowerInstall']);
	// TODO clean, min-versioning
};