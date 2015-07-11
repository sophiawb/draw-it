// Update title text in .title


// Get data from file

var minX = 1960;// get value from data, or set manually
var maxX = 2015;


var svg = d3.select(".graph");

var scale = d3.scale.linear()
  .domain([minX, maxX])
  .range([100, 700]);

