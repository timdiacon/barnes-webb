module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dev: {
				options: {
					style: 'expaned'
				},
				files : {
					'dev/css/style.css':'dev/sass/style.scss'
				}
			}
		},

		bower_concat: {
			all: {
				dest:'dev/js/vendor.js'
			}
		},

		watch: {
			css: {
				files:'dev/sass/*.scss',
				tasks:'sass'
			}
		},

		copy: {
			main: {
				files:[
					{expand: true, flatten:true, src: ['dev/css/*'], dest: 'build/css/', filter: 'isFile'},
					{expand: true, flatten:true, src: ['dev/js/*'], dest: 'build/js/', filter: 'isFile'},
					{expand: true, flatten:true, src: ['dev/index.html'], dest: 'build/', filter: 'isFile'}
				]
			}
		}


	});

	// run once to copy vendor js into dev
	grunt.registerTask('init',['bower_concat']);
	grunt.registerTask('default',['watch:css']);

	// TODO setup concat & uglify
	grunt.registerTask('build',['copy:main']);
};