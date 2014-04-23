// TODO: Make threshold a gradient for non-discrete values
// TODO: Orient at the bottom instead

// ISSUES: With book shape file, Alabama disappears
// ISSUES: With official shape file, Minnesota disappears

var thresholdSuffix = "%",
    // Find a better title
    thresholdTitle = "Threshold Description",
    thresholdIsDiscrete = false;

var threshold = d3.scale.threshold()
    .domain(color.domain())
    .range(color.range());

var keyX = d3.scale.linear()
    .domain(d3.extent(threshold.domain()))
    .range([0, (width - margin.hor)/2]); // total key width

var keyXAxis = d3.svg.axis()
    .scale(keyX)
    .orient("bottom")
    .tickSize((thresholdIsDiscrete === true) ? 13 : 0)
    .tickValues(threshold.domain())
    .tickFormat(function(d) { return thresholdIsDiscrete ? d + thresholdSuffix : ""; });

var g = svg.append("g")
    .attr({
        "class": "key", // Rename
        "transform": "translate(" + margin.left + "," + margin.top + ")"
    });

// Threshold bars
g.selectAll("rect")
    // Iterate over the threshold range to pass values later
    .data(threshold.range().map(function(d, i) {
        return {
            // Calculate horizontal starting point, i.e. x coordinate
            x0: i ? keyX(threshold.domain()[i - 1]) : keyX.range()[0],
            // Calculate horizontal endpoint
            x1: i < threshold.domain().length ? keyX(threshold.domain()[i]) : keyX.range()[1],
            // Return colour
            z: d
        };
    }))
    .enter()
        .append("rect")
        .attr({
            "height": 8,
            "x": function(d) { return d.x0; },
            "width": function(d) { return d.x1 - d.x0; }
        })
        .style("fill", function(d) { return d.z; });

// Threshold title
g.call(keyXAxis)
    .append("text")
    .attr({
        "class": "caption", // Rename
        "y": -6
    })
    .text(thresholdTitle);
