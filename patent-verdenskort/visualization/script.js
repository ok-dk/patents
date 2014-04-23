// Local settings
// var countryValue = "country",
var countryValue = "Country Name",
    // dataValue = "total";
    dataValue = "2012";

var color = d3.scale.linear()
    // .domain([0, 25, 50, 75, 100])
    .range([
        "#d7191c",
        "#2b83ba"
    ]);

var projection = d3.geo.kavrayskiy7()
    // via https://github.com/d3/d3-geo-projection/
    .translate([width/2, height/2])
    .scale(150); // Revise so it isn't a magic number

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body")
    .append("svg")
    .attr({
        "width": width,
        "height": height
    });

// Local helper functions
// to be moved to chart.js
var cleanPrefix = function(string) {
    // Remove any "<", ">" or "~" prefixed to a number value
    // e.g. d3Helpers.cleanPrefixes(data[i].total);
    prefix = string.substring(0, 1);

    if (prefix === "<" || prefix === ">" || prefix === "~") {
        return string.substring(1);
    } else {
        return string;
    }
};

// Load the data values
d3.csv("../../_data/dataset.csv", function(data) {

    // Geodata loaded into the csv scope
    d3.json("assets/data/ne_110m_admin_0_countries_lakes.geojson", function(json) {
        var dataLength = data.length,
            jsonLength = json.features.length;

        // data (values) forloop
        for (var i = 0; i < dataLength; i++) {
            if (data[i]["Country Name"] === "United States") {
                color.domain([0, Math.log(data[i][dataValue])]);
            }

            var dataCountry = data[i][countryValue],
                // cleanedDataValue = cleanPrefix(Math.log(data[i][dataValue]));
                cleanedDataValue = Math.log(data[i][dataValue]);

            // json (geodata) forloop
            for (var j = 0; j < jsonLength; j++) {
                var jsonCountry = json.features[j].properties.name_long;
                if (dataCountry == jsonCountry) {
                    json.features[j].properties.value = cleanedDataValue;
                    break;
                }
            }
        }

        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr({
                "d": path,
                "class": "country",
                "transform": "translate(" + 0 + "," + margin.top + ")"
            })
            .style("fill", function(d) {
                var value = d.properties.value;
                return value ? color(value) : "#000";
            });
    });
});
