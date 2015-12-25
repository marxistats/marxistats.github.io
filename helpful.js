var fs= require('fs');

var file = fs.readFileSync('Untitleddocument.txt','utf8');

var temp = file.replace(/,/mg,".");
temp = temp.split(" ");
var result1="";
var result2="";
var i=0;
while(i < temp.length) {
  result1 += temp[i]+","+temp[i+1]+","+temp[i+2]+","+temp[i+3] + "\n";
  i+=4;
  result2 += temp[i]+","+temp[i+1]+","+temp[i+2]+","+temp[i+3] + "\n";
  i+=4;
}

console.log(result1+result2);
