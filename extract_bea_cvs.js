var fs= require('fs');

var file = fs.readFileSync(process.argv[2],'utf8');
var lines = file.split('\r\n');
var data = [];
var start = false;
for(var i = 0; i<lines.length; i++) {
  var line = lines[i];
  if(start) {
    if(line.match(/^"\s*"/) != null){
      continue;
    }
    var array = line.split('"');
    if(isNaN(array[1])){
      continue;
    }
    var name = array[3].trim().replace(/ /mg,"_");
    array = array[4].split(",");
    array = array.slice(1);
    array.forEach(function(each,index){ data[index][name] = each;}); 
  } else {
    if(line.indexOf('"Line"') == 0) {
      var years = line.replace(/"/mg,'').split(",").slice(2);
      years.forEach(function(each){ data.push({'year':each})}); 
      start = true;
    }
  }
}

# 

process.stdout.write(Object.keys(data[0]).join(",") + "\n");

data.forEach(function(each){
  var larray = [];
  Object.keys(each).forEach(function(key){
    larray.push(each[key]);
  });
  process.stdout.write(larray.join(",")+"\n");
});
