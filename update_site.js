var fs= require('fs');
var execSync = require('child_process').execSync;
var cpath = ".";

function recursive(cpath) {
  var files = fs.readdirSync(cpath + "/");
  files.forEach(function(file, index, files) {
    var stat = fs.statSync(cpath + "/" + file);
    if (stat.isDirectory()) {
    
      recursive(cpath + "/" +file);
    
    } else {
    
      if(file.slice(-4) == "html") {
        execSync("litprog -html "+ file + " javascript > code.js");    
        execSync("litprog -html "+ file + " data > data.csv");    
      }
    
    }
  });
}
recursive(cpath);

['analyses','data'].forEach(function(mfolder){
  var results = [];
  var files = fs.readdirSync("./" + mfolder + "/");
  files.forEach(function(file, index, files) {
    var stat = fs.statSync("./" + mfolder + "/" + file);
    if (stat.isDirectory()) {
      var ifiles = fs.readdirSync("./" + mfolder + "/" + file + "/");
      ifiles.forEach(function(ifile) {
        var stat = fs.statSync("./" + mfolder + "/" + file + "/" + ifile);
        if (stat.isDirectory()) {
          result.push({'title':ifile.slice(-5),'folder':file,'time':stat.mtime.getTime()});
        }
      });
    }
  });
  console.log(results);
});

