d3.select('.title').text(title);


var minX = 1960;
var maxX = 2015;
var minY = 60;
var maxY = 80;

data = data.data.map(function(d) { return {x: +d[0].slice(0,4), y: d[1]}; });

var svg = d3.select(".graph");






// Set up axes

var xScale = d3.scale.linear()
  .domain([minX, maxX])
  .range([100,700]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom")
  .ticks(10); // "best guess"

var yScale = d3.scale.linear()
  .domain([minY, maxY])
  .range([700,100]);

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .ticks(10); // "best guess"

var xg = svg.append("g");
xAxis(xg);

var yg = svg.append("g");
yAxis(yg);


xg.attr("transform", "translate(0,700)")
  .attr("class", "x-axis");

xg.selectAll("path")
  .style({ fill: "none", stroke: "#000"});
xg.selectAll("line")
  .style({ stroke: "#000"});

yg.attr("transform", "translate(100,0)")
  .attr("class", "y-axis");

yg.selectAll("path")
  .style({ fill: "none", stroke: "#000"});
yg.selectAll("line")
  .style({ stroke: "#000"});


// Draw the graph

// var x = d3.scale.ordinal()
//   .domain(d3.extent(data, function(d) {return d.x; }));

// var y = d3.scale.ordinal()
//   .domain(d3.extent(data, function(d) {return d.y; }));

var valueline = d3.svg.line()
  .x(function(d) { return xScale(d.x); })
  .y(function(d) { return yScale(d.y); });

svg.append("path")
  .attr("class", "line")
  .attr("d", valueline(data));

