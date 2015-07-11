// Update title text in .title


// Get data from file

var minX = 1960;// get value from data, or set manually
var maxX = 2015;
var minY = 60;
var maxY = 80;


var svg = d3.select(".graph");
/*

var makeScale = (direction, domain, range) {
  var scale = d3.scale.linear()
    .domain(domain)
    .range(range);

  var axis = d3.svg.axis()
    .scale(scale)
    .orient(direction)
    .ticks(10); // "best guess"

  var g = svg.append("g");
  axis(g);
  g.attr("transform", "translate(50,100)");
  g.selectAll("path")
    .style({ fill: "none", stroke: "#000"});
  g.selectAll("line")
    .style({ stroke: "#000"});

}

makeScale("bottom", [minX, maxX], [100,700]);
//makeScale("left", [minY, maxY], [100,100]);
*/


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


