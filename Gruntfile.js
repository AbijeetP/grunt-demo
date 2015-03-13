module.exports = function(grunt) {
  var gridFiles = [
    "plugins/jqxwidgets/jqxcore.js", 
    "plugins/jqxwidgets/jqxdata.js",
    "plugins/jqxwidgets/jqxgrid.js",
    "plugins/jqxwidgets/jqxgrid.sort.js",
    "plugins/jqxwidgets/jqxgrid.pager.js",
    "plugins/jqxwidgets/jqxgrid.selection.js",
    "plugins/jqxwidgets/jqxgrid.sort.js",
    "plugins/jqxwidgets/jqxgrid.aggregates.js",
    "plugins/jqxwidgets/jqxbuttons.js",
    "plugins/jqxwidgets/jqxscrollbar.js",
    "plugins/jqxwidgets/jqxgrid.columnsresize.js",
    "plugins/jqxwidgets/jqxgrid.columnsreorder.js",
    "plugins/jqxwidgets/jqxdropdownlist.js",
    "plugins/jqxwidgets/jqxlistbox.js",
    "plugins/jqxwidgets/jqxmenu.js",
    "plugins/jqxwidgets/jqxcheckbox.js",
    "plugins/jqxwidgets/jqxgrid.storage.js",
    "plugins/jqxwidgets/jqxdraw.js",
    "plugins/jqxwidgets/jqxchart.core.js",
    "plugins/jqxwidgets/jqxgrid.filter.js",
    "plugins/jqxwidgets/jqxchart.js",
    "plugins/jqxwidgets/jqxwindow.js"    
  ];  

  var minifyFiles = {};  
  minifyFiles[__dirname + '/dist/jqxwidgets.min.js'] = gridFiles;
  minifyFiles[__dirname + '/dist/custom.min.js'] = "js/*";
  // Project configuration.
  console.log(minifyFiles);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      prod: {
        files: minifyFiles
      }, options: {
    	    mangle: true
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify:prod']); 
};
