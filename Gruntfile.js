

module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			scripts: {
				files: ['js/*.js'],
			},
			options: {
				livereload: true,
			},
		},
	});

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
};