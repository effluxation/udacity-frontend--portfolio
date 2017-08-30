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
          width: 1140,
          quality: 85
          },
          {
          name: 'md',
          width: 940,
          quality: 85
          },
          {
          name: 'sm',
          width: 720,
          quality: 85
          },
          {
          name: 'xs',
          width: 540,
          quality: 85
          },
          {
          name: 'lg',
          width: 2280,
          quality: 85,
          suffix: '_2x'
          },
          {
          name: 'md',
          width: 1880,
          quality: 85,
          suffix: '_2x'
          },
          {
          name: 'sm',
          width: 1440,
          quality: 85,
          suffix: '_2x'
          },
          {
          name: 'xs',
          width: 1080,
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
          width: 360,
          quality: 85
          },
          {
          name: 'md',
          width: 293,
          quality: 85
          },
          {
          name: 'xs',
          width: 534,
          quality: 85
          },
          {
          name: 'xs2',
          width: 396,
          quality: 85
          },
          {
          name: 'lg-sm',
          width: 720,
          quality: 85,
          suffix: '_2x'
          },
          {
          name: 'md',
          width: 586,
          quality: 85,
          suffix: '_2x'
          },
          {
          name: 'xs',
          width: 1068,
          quality: 85,
          suffix: '_2x'
          },
          {
          name: 'xs2',
          width: 792,
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

    // responsive_images_extender: {
    //   front: {

    //   },
    //   featured: {

    //   }

    // },

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