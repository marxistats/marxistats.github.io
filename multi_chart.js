function multi_chart(data_locations,computation,root_location,y_name) {
 
  var data; 
  function draw() {
    $(root_location).empty();
    var markdown_left = Math.floor($('.markdown').css('margin-left').slice(0,-2));
    var markdown_right = Math.floor($('.markdown').css('margin-right').slice(0,-2));
    var margin = {top: 20, right: markdown_right+30, bottom: 30, left: markdown_left+30},
       width = window.innerWidth - margin.left - margin.right,
       height = window.innerWidth*5/14 - margin.top - margin.bottom;
    
    
    var x = d3.time.scale()
       .range([0, width]);
    
    var y = d3.scale.linear()
       .range([height, 0]);
    
    var color = d3.scale.category10();
    
    var xAxis = d3.svg.axis()
       .scale(x)
       .orient("bottom");
    
    var yAxis = d3.svg.axis()
       .scale(y)
       .orient("left");
    
    var line = d3.svg.line()
       .x(function(d) { return x(d.year); })
       .y(function(d) { return y(d.y_value); });
    var svg = d3.select(root_location).append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
     .append("g")
       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   color.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));
  
  
   var stats = color.domain().map(function(name) {
     return {
       name: name,
       values: data.map(function(d) {
         return {year: d.year, y_value: +d[name]};
       })
     };
   });
  
   x.domain(d3.extent(data, function(d) { return d.year; }));
  
   y.domain([
     d3.min(stats, function(c) { return d3.min(c.values, function(v) { return v.y_value; }); }),
     d3.max(stats, function(c) { return d3.max(c.values, function(v) { return v.y_value; }); })
   ]);
  
   svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis);
  
   svg.append("g")
       .attr("class", "y axis")
       .call(yAxis)
     .append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 6)
       .attr("dy", ".71em")
       .style("text-anchor", "end")
       .text(y_name);
  
   var stat = svg.selectAll(".stat")
       .data(stats)
     .enter().append("g")
       .attr("class", "stat");
  
   stat.append("path")
       .attr("class", "line")
       .attr("d", function(d) { return line(d.values); })
       .style("stroke", function(d) { return color(d.name); });
  
   stat.append("text")
       .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
       .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.y_value) + ")"; })
       .attr("x", 3)
       .attr("dy", ".35em")
       .text(function(d) { return d.name; });
  }
  
  var parseDate = d3.time.format("%Y").parse;
  var d_i = 0;
  var tdata = [];
  function recursive(){
    d3.csv(data_locations[d_i][0], function(error, ldata) {
      if (error) throw error;
        ldata.forEach(function(each){
          each.year = parseDate(each.year);
          insert(each,tdata,data_locations[d_i][1]);
        });
        d_i++;
      if(d_i < data_locations.length){
        recursive();
      } else {
        data = [];
        tdata.forEach(function(each){
          data.push(computation(each));
        });  
        $(document).ready(function() {
          draw();
          window.onresize = draw;
        });
      }
    });
  }

  function insert(item,data,keys){
    if(data.length == 0) {
      data.push({'year':item.year});
    }
    var i = 0;
    while(i < data.length && item.year > data[i].year ) {
      i++;
    }
    if(data.length == i) {
      data.push({'year':item.year});
    } else {
      if(data[i].year != item.year) {
        data.splice(i,0,{'year':item.year});
      }
    }
    var citem = data[i];
    keys.forEach(function(key){
      citem[key] = item[key];
    });
  }
  recursive();
}
