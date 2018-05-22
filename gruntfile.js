module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bootlint: {
      options: {
        relaxerror: [],
        showallerrors: false,
        stoponerror: false,
        stoponwarning: false
      },
      files: ['index.html']
    },

    copy: {
      prod: {
        files: [{
          expand: true,
          cwd: ,
          src: ['img/**/*', '!img/model/**/*', '!img/*.{jpg,png}'],
          dest: paths.prodDir
        }]
      },
      tempImg: {
        files: [{
          expand: true,
          flatten: true,
          src: ['temp/img/model/d_im/*.jpg'],
          dest: 'img/model/'
        }, {
          expand: true,
          flatten: true,
          src: ['temp/img/*.{jpg,png}'],
          dest: 'img/'
        }]
      },
      dev: {
        files: [{
          expand: true,
          cwd: ,
          src: ['img/**/*', '!img/model/**/*', 'model/**/*', 'index.html'],
          dest:
        }]
      }
    },

    clean: {
      prebuild: {
        src: ['*']
      },
      postuglify: {
        src: [ + 'app.js', + 'vendor.js']
      },
      preImgModelProcess: {
        src: ['temp/img']
      },
      postImgModelProcess: {
        src: ['temp/img/model/b_crop', 'temp/img/model/c_retina']
      }
    },

    postcss: {
      options: {
        map: false
      },
      dev: {
        processors: [
          require('postcss-import')(),
          require('postcss-mixins')(),
          require('postcss-nested')(),
          require('postcss-cssnext')(),
          require('postcss-hexrgba')()
        ],
        src: 'src/css/styles.css',
        dest: 'docs/css/styles.css'
      },
      prod: {
        processors: [
          require('postcss-import')(),
          require('postcss-mixins')(),
          require('postcss-nested')(),
          require('postcss-cssnext')(),
          require('postcss-hexrgba')(),
          require('cssnano')()
        ],
        src: 'src/css/styles.css',
        dest: 'docs/css/styles.min.css'
      }
    },

    responsive_images: {
      front: {
        options: {
          sizes: [{
            name: 'lg',
            width: 1141,
            quality: 85
          },
          {
            name: 'md',
            width: 941,
            quality: 85
          },
          {
            name: 'sm',
            width: 721,
            quality: 85
          },
          {
            name: 'xs',
            width: 541,
            quality: 85
          },
          {
            name: 'lg',
            width: 2281,
            quality: 85,
            suffix: '_2x'
          },
          {
            name: 'md',
            width: 1881,
            quality: 85,
            suffix: '_2x'
          },
          {
            name: 'sm',
            width: 1441,
            quality: 85,
            suffix: '_2x'
          },
          {
            name: 'xs',
            width: 1081,
            quality: 85,
            suffix: '_2x'
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['img_src/front.jpg'],
          dest: 'img/'
        }]
      },
      featured: {
        options: {
          sizes: [{
            name: 'lg_sm',
            width: 361,
            quality: 85
          },
          {
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
            name: 'xs2',
            width: 397,
            quality: 85
          },
          {
            name: 'lg_sm',
            width: 721,
            quality: 85,
            suffix: '_2x'
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
            name: 'xs2',
            width: 793,
            quality: 85,
            suffix: '_2x'
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['img_src/featured/*.jpg'],
          dest: 'img/featured/'
        }]
      }
    },

    responsive_images_extender: {
      task: {
        options: {
          srcAttribute: 'smallest',
          sizes: [{
            selector: '.front img',
            sizeList: [{
              cond: 'max-width: 767px',
              size: '95vw'
            },
            {
              cond: 'max-width: 991px',
              size: '720px'
            },
            {
              cond: 'max-width: 1199px',
              size: '940px'
            },
            {
              cond: 'default',
              size: '1140px'
            }]
          },
          {
            selector: 'article img',
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
          src: ['index.html'],
          dest: 'temp/'
        }]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      reload: {
        files: ['index.html', 'css/styles.css'],
        tasks: [],
        options: {
          spawn: false
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('prod', [
    'postcss:prod'
  ]);

  grunt.registerTask('dev', [
    'postcss:dev'
  ]);
};
