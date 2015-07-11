d3.select('.title').text(title);



data = data.data.map(function(d) { return {x: +d[0].slice(0,4), y: d[1]}; }).reverse();
var minX = d3.min(data, function(d) {return d.x; });
var maxX = d3.max(data, function(d) {return d.x; });
var minY = d3.min(data, function(d) {return d.y; });
var maxY = d3.max(data, function(d) {return d.y; });

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

var drawGraph = function(){
  var valueline = d3.svg.line()
    .x(function(d) { return xScale(d.x); })
    .y(function(d) { return yScale(d.y); });

  var path = svg.append("path")
    .attr("class", "line")
    .attr("class", "actual-line")
    .attr("d", valueline(data));

  var totalLength = path.node().getTotalLength();

  path
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
      .duration(2000)
      .ease("linear")
      .attr("stroke-dashoffset", 0);
};

var line;

svg
    .on("mousedown", mousedown)
    .on("mouseup", mouseup);

var startLine = function(m, x, y) {
  line = svg.append("line")
      .attr("class", "user-line")
      .attr("x1", x || m[0])
      .attr("y1", y || m[1])
      .attr("x2", m[0])
      .attr("y2", m[1]);  
};

function mousedown() {
    var m = d3.mouse(this);
    startLine(m);
    svg.on("mousemove", mousemove);
}

function mousemove() {
    var m = d3.mouse(this);
    if (! (+line.attr("x2") % 2)) {
      var x = line.attr('x2');
      var y = line.attr('y2');
      startLine(m,x,y);
    }
    line.attr("x2", m[0])
        .attr("y2", m[1]);
}

function mouseup() {
    svg.on("mousemove", null);
}

var visible = false;
d3.select('.show-graph').on('click', function() {
  if (visible) {
    d3.select('.actual-line').remove();
    d3.select(this).text('Show Graph');
  } else {
    drawGraph();
    d3.select(this).text('Hide Graph');
  }
  visible = !visible;
});

d3.select('.redraw').on('click', function() {
  d3.selectAll('.user-line').remove();
  console.log('called');
});

// Add labels
d3.select('.x-axis-title')
  .text("Year")
  //.transform('translate(0,0)');
// d3.select('.y-axis-title')
//   .text("Average Life Expectancy")
  //.transform('translate(0,0)');
