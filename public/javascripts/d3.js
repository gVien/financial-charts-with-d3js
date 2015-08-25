// Defining the width, height, and margin
var margin = {top: 20, right: 30, bottom: 80,  left: 100},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// hard code for testing
// var data = [{date: "2015-08-04", open: 46.71, high: 47.26, low: 46.11, close: 46.50 }, {date: "2015-08-05", open: 45.71, high: 46.26, low: 45.11, close: 45.50 }, {date: "2015-08-06", open: 44.71, high: 45.26, low: 44.11, close: 44.50 }]

// parsing the date based on "YYYY-MM-DD"
var parseDate = d3.time.format("%Y-%m-%d").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// function to determine the maximum and minimum values
function min(x, y){ return x < y ? x : y ; }

function max(x, y){ return x > y ? x : y; }

function buildChart(data) {

  var zoom = d3.behavior.zoom()
    .x(x)
    .y(y)
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

  var svg = d3.select(".chart-area").append("svg")
      .attr("id", "chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);

  // parse date
  data.forEach(function(d) { d.date = parseDate(d.date); });

  // sort the data by date ascending order (oldest to newest)
  data = data.sort(function(d1, d2) { return d1.date - d2.date;})

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([d3.min(data.map(function(datum) {return datum.low;})) - 3, d3.max(data.map(function(datum) {return datum.high;})) + 3] );

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate("+ 0.25 * (width - 2 * margin.top) / data.length + "," + height + ")")    // translate the position of the ticks to match with the candelstick shadows
    .call(xAxis)
  .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -250)
    .attr("y", -50)
    // .attr("dy", "1.71em") // change position of the "price" label
    .style("text-anchor", "end")
    .text("Price ($)");

  // draw the body of candlesticks
  svg.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", function(d) { return x(d.date); })
    .attr("y", function(d) {return y(max(d.open, d.close));})
    .attr("height", function(d) { return y(min(d.open, d.close))-y(max(d.open, d.close));})
    .attr("width", function(d) { return 0.5 * (width - 2*margin.top)/data.length; })
    .attr("stroke-width", 1)
    .attr("stroke", "black")
    .attr("fill",function(d) { return d.close >= d.open ? "white" : "black" ;});

  // the upper candle stick shadow (stem)
  svg.selectAll("line.upper-stem")
    .data(data)
    .enter().append("line")
    .attr("class", "upper-stem")
    .attr("x1", function(d) { return x(d.date) + 0.25 * (width - 2 * margin.right)/ data.length;})
    .attr("x2", function(d) { return x(d.date) + 0.25 * (width - 2 * margin.right)/ data.length;})
    .attr("y1", function(d) { return y(d.high);})
    .attr("y2", function(d) { return d.open >= d.close ? y(d.open) : y(d.close); })
    .attr("stroke", "black");

  // the lower candle stick shadow (stem)
  svg.selectAll("line.lower-stem")
    .data(data)
    .enter().append("line")
    .attr("class", "lower-stem")
    .attr("x1", function(d) { return x(d.date) + 0.25 * (width - 2 * margin.right)/ data.length;})
    .attr("x2", function(d) { return x(d.date) + 0.25 * (width - 2 * margin.right)/ data.length;})
    .attr("y1", function(d) { return d.open >= d.close ? y(d.close) : y(d.open);})
    .attr("y2", function(d) { return y(d.low); })
    .attr("stroke", "black");

  function zoomed() {
    // svg.select("g.x.axis").call(xAxis);
    // svg.select("g.y.axis").call(yAxis);
    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }
}


// AJAX TO ADD CHART
var addChart = function() {
  $(".symbol-form").on("submit", function(event) {
    event.preventDefault();
    var data = $(this).serialize();
    newChart(data);
  });
};

var newChart = function(data) {
  var form = $(".symbol-form");
  $.ajax({
    url: form.attr("action"),
    method: form.attr("method"),
    data: data,
    dataType: "JSON",
    beforeSend: function() {
      appendAjaxLoader();
    }
  }).done(function(data) {
    if (data.length > 0) {
      emptyForms();
      removeAjaxLoader();
      removeErrorMessage();
      buildChart(data);
    } else {
      removeAjaxLoader();
      removeErrorMessage();
      appendErrorMessage();
    }
  });
};

var appendErrorMessage = function() {
  $(".form-container").append("<p class='error'>That is not a valid stock symbol or period! You may try: GOOG, YHOO, TSLA, etc.</p>");
};

var removeErrorMessage = function() {
  $(".error").remove();
};

var appendAjaxLoader = function() {
  $(".form-container").append("<div class='ajax-loader'><img src='../ajax-loader.gif'></div>");
}

var removeAjaxLoader = function() {
  $(".ajax-loader").remove();
}

var emptyForms = function() {
  $(".symbol").val("");
  $(".period").val("");
}
$(document).ready(function() {
  addChart();
});

