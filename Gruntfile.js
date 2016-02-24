module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify:{
            options:{
                stripBanners: true,
                banner:'/* <%=pkg.name%>-<%pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build:{
                src:'dist/all.js',
                dest:'dist/all.min.js'
            }
        },
        concat: {
            options: {
                seperator: ';'
            },
            dist: {
                src: ['src/jquery-1.11.3.min.js', 'src/underscore.js', 'src/backbone.js', 'src/app.js'],
                dest: 'dist/all.js'
            }
        },
        jshint:{
            files:['Gruntfile.js', 'src/app.js'],
            options:{
                globals:{
                    jQuery:true,
                    console:true,
                    module:true
                }
            }
        },
        cssmin:{
            options: {
                shorthandCompacting: true,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'style/style.min.css': ['style/style.css']
                }
            }
        },
        watch:{
            scripts:{
                files: ['src/app.js'],
                tasks: ['jshint', 'concat', 'uglify'],
                options:{
                    spawn:false,
                    reload:true
                }
            },
            css:{
                files: ['style/style.css'],
                tasks: ['cssmin'],
                options:{
                    spawn:false,
                    reload:true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['concat', 'uglify','jshint', 'cssmin']);
    grunt.registerTask('watchit', ['watch']);
};
