module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bootlint: {
      options: {
        stoponerror: false,
        relaxerror: []
      },
      files: ['index.html']
    }
  })
  require('load-grunt-tasks')(grunt)
}