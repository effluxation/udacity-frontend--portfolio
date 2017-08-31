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
          name: 'lg-sm',
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
          width: 531,
          quality: 85
          },
          {
          name: 'xs2',
          width: 397,
          quality: 85
          },
          {
          name: 'lg-sm',
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
          width: 1069,
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
      front: {
        options: {
          srcAttribute: 'smallest',
          // sizes: [{
          //   selector: '.front img',
          //   sizesList: [{
          //     cond: 'max-width: 767px',
          //     size: ''
          //   }]
          // }]
        },
        files: [{
          expand: true,
          src: ['index.html'],
          dest: 'temp/'
        }]
      }
      // featured: {
      //   options: {},
      //   files: [{}]
      // }

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
  })
  require('load-grunt-tasks')(grunt)
}