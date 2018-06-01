module.exports = function (grunt) {
  const paths = grunt.file.readYAML('Gruntpaths.yml');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      prod: {
        files: [{
          expand: true,
          cwd: paths.srcDir,
          src: ['img/*', 'LICENSE', 'README.md'],
          dest: paths.prodDir
        }]
      },
      tempImg: {
        files: [{
          expand: true,
          flatten: true,
          src: ['temp/img/projects/resp/*'],
          dest: paths.prodDir + 'img/projects/'
        }]
      },
      dev: {
        files: [{
          expand: true,
          cwd: paths.srcDir,
          src: [
            'img/*',
            'index.html'
          ],
          dest: paths.prodDir
        }]
      }
    },

    clean: {
      prebuild: {
        src: [paths.prodDir + '*']
      },
      tempImg: {
        src: ['temp/img/']
      },
      postuglify: {
        src: [
          paths.prodDirJs + 'main.js', paths.prodDirJs + 'vendor.js'
        ]
      }
    },

    filerev: {
      assets: {
        files: [{
          src: [
            paths.prodDirJs + '*.js',
            paths.prodDirCss + '*.css'
          ]
        }]
      }
    },

    imagemin: {
      projects: {
        files: [{
          expand: true,
          flatten: true,
          src: paths.srcDir + 'img/projects/*.jpg',
          dest: 'temp/img/projects/imagemin/'
        }]
      }// ,
      // modal: {
      //   files: [{
      //     expand: true,
      //     flatten: true,
      //     src: 'src/img/*.{jpg,png}',
      //     dest: 'temp/img/'
      //   }]
      // }
    },

    jshint: {
      options: {
        force: true,
        reporter: require('jshint-stylish'),
        globals: {
          jQuery: true
        },
        browser: true,
        esversion: 6,
        forin: false
      },
      all: [paths.srcDirJs + '**/*.js']
    },

    modernizr: {
      dist: {
        crawl: true,
        files: {
          src: [
            paths.prodDirJs + 'main.js',
            paths.prodDirCss + 'styles.css'
          ]
        },
        customTests: [],
        dest: 'temp/modernizr.js',
        options: ['setClasses'],
        uglify: true
      }
    },

    postcss: {
      prod: {
        options: {
          map: false,
          processors: [
            require('postcss-import')(),
            require('postcss-mixins')(),
            require('postcss-nested')(),
            require('postcss-cssnext')(),
            require('postcss-hexrgba')(),
            require('cssnano')()
          ]
        },
        src: paths.srcDirCss + 'styles.css',
        dest: paths.prodDirCss + 'styles.min.css'
      },
      dev: {
        options: {
          map: false,
          processors: [
            require('postcss-import')(),
            require('postcss-mixins')(),
            require('postcss-nested')(),
            require('postcss-cssnext')(),
            require('postcss-hexrgba')()
          ]
        },
        src: paths.srcDirCss + 'styles.css',
        dest: paths.prodDirCss + 'styles.css'
      },
      px2rem: {
        options: {
          map: false,
          processors: [require('postcss-pxtorem')()]
        },
        src: paths.srcDirCss + '**/*.css'
      }
    },

    processhtml: {
      docs: {
        files: {
          [paths.prodDir + 'index.html']: [paths.srcDir + 'index.html']
        }
      }
    },

    responsive_images: {
      projects: {
        options: {
          sizes: [{
            name: 'md',
            width: 291,
            quality: 85
          },
          {
            name: 'xs',
            width: 550,
            quality: 85
          },
          {
            name: 'xs2_sm_lg',
            width: 397,
            quality: 85
          },
          {
            name: 'md',
            width: 587,
            quality: 85,
            suffix: '_2x'
          },
          {
            name: 'xs',
            width: 1100,
            quality: 85,
            suffix: '_2x'
          },
          {
            name: 'xs2_sm_lg',
            width: 793,
            quality: 85,
            suffix: '_2x'
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['temp/img/projects/imagemin/*.*'],
          dest: 'temp/img/projects/resp/'
        }]
      }
    },

    responsive_images_extender: {
      task: {
        options: {
          srcAttribute: 'smallest',
          sizes: [{
            selector: '.featured-project__img',
            sizeList: [{
              cond: 'max-width: 568px',
              size: '70vw'
            },
            {
              cond: 'max-width: 767px',
              size: '72vw'
            },
            {
              cond: 'max-width: 991px',
              size: '345px'
            },
            {
              cond: 'max-width: 1199px',
              size: '293px'
            },
            {
              cond: 'default',
              size: '360px'
            }]
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: paths.prodDir + 'index.html',
          dest: paths.prodDir
        }]
      }
    },

    rollup: {
      options: {
        plugins: [
          require('rollup-plugin-babel')({
            exclude: ['./node_modules/**', '**/*.json'],
            babelrc: false,
            presets: [['env', { 'modules': false }]],
            plugins: ['external-helpers']
          }),
          require('rollup-plugin-node-resolve')({ jsnext: true })
        ]
      },
      app: {
        options: {
          format: 'iife'
        },
        files: {
          [paths.prodDirJs + 'main.js']: [paths.srcDirJs + 'main.js']
        }
      },
      vendor: {
        options: {
          format: 'es'
        },
        files: {
          [paths.prodDirJs + 'vendor.js']: [paths.srcDirJs + 'vendor.js']
        }
      }
    },

    stylelint: {
      options: {
        failOnError: false
      },
      all: [paths.srcDirCss + '**/*.css']
    },

    uglify: {
      options: {
        sourceMap: false
      },
      app: {
        options: {
          banner: '/*! <%= pkg.name %> | <%= pkg.author %> | <%= pkg.license %> */\n'
        },
        src: paths.prodDirJs + 'main.js',
        dest: paths.prodDirJs + 'main.min.js'
      },
      vendor: {
        src: paths.prodDirJs + 'vendor.js',
        dest: paths.prodDirJs + 'vendor.min.js'
      }
    },

    usemin: {
      html: paths.prodDir + 'index.html'
    },

    watch: {
      reload: {
        files: [paths.prodDirCss + 'styles.css'],
        tasks: [],
        options: {
          livereload: true
        }
      },
      js: {
        files: [paths.srcDirJs + '**/*.js'],
        tasks: ['jshint']
      },
      css: {
        files: [paths.srcDirCss + '**/*.css'],
        tasks: ['stylelint']
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('prod', [
    'jshint',
    'stylelint',
    'clean:prebuild',
    'copy:prod',
    'copy:tempImg',
    'rollup:app',
    'postcss:prod',
    'modernizr',
    'rollup:vendor',
    'uglify',
    'clean:postuglify',
    'processhtml',
    'filerev',
    'usemin',
    'responsive_images_extender'
  ]);

  grunt.registerTask('dev', [
    'clean:prebuild',
    'copy:dev',
    'copy:tempImg',
    'rollup',
    'postcss:dev',
    'responsive_images_extender'
  ]);

  grunt.registerTask('imgProcess', [
    'clean:tempImg',
    'imagemin',
    'responsive_images'
  ]);

  grunt.registerTask('fullProd', [
    'imgProcess',
    'prod',
    'clean:tempImg'
  ]);
};
