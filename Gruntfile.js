module.exports = function(grunt) {
	grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
        	banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= pkg.homepage %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        unwrap: {
        	src: 'src/*.js',
        	dest: 'build/*.js'
        },
        uglify: {
        	src: 'src/<%= pkg.name %>.js',
        	dest: 'build/<%= pkg.name %>.min.js'
    	},
    	watch: {
    		/*scripts: {
    			files: 'src/*.js',
    			tasks: ['unwrap']
    		},*/
    		build: {
    			files: 'build/<%= pkg.name %>.js',
    			tasks: ['uglify']
    		},
    		html: {
    			files: 'test/*'
    		}
    	}
    });
	// 加载包含 "uglify" 任务的插件。
  	grunt.loadNpmTasks('grunt-contrib-uglify');
  	// 加载包含 "watch" 任务的插件。
  	grunt.loadNpmTasks('grunt-contrib-watch');
  	grunt.event.on('watch', function(action, filepath, target) {
  		grunt.log.writeln(target + ':' + filepath + ' has' + action);
  	});
  	// 加载包含 "unwrap" 任务的插件。
  	grunt.loadNpmTasks('grunt-unwrap');

    grunt.registerTask('default', ['watch']);
};