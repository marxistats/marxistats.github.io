var fs= require('fs');
var execSync = require('child_process').execSync;

function recursive(cpath) {
  var files = fs.readdirSync(cpath + "/");
  files.forEach(function(file, index, files) {
    var stat = fs.statSync(cpath + "/" + file);
    if (stat.isDirectory()){
      if(file.charAt(0)!="." && file != "MathJax-master" && file != "highlight") {
        recursive(cpath + "/" +file);
      }
    } else {
    
      if(file.slice(-4) == "html") {
        execSync("litprog -html "+ cpath + "/" + file + " javascript > " + cpath + "/" +"code.js");
        if(cpath.indexOf("./data")==0){ 
          execSync("litprog -html "+ cpath + "/" + file + " data > " + cpath + "/" + "data.csv");    
        }
      }
    
    }
  });
}
recursive(".");

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
          var time = stat.mtime;
          time = time.getFullYear() + '/' + time.getMonth() + '/' + time.getDate();
          var link = "<a href='" + file + "/" + ifile + "/" + ifile + ".html'>" + ifile + "</a>";
          results.push({'title':link,'folder':file.replace("_"," "),'time': time});
        }
      });
    }
  });
  fs.writeFileSync("./" +mfolder+"/index.json",JSON.stringify(results));
});

