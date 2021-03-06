// Local settings
var countryValue = "Country Name",
    dataValue = "2012";

var color = d3.scale.linear()
    .range(["#d7191c", "#2b83ba"])
    .clamp(true) // Renders values outside domain, such as log(0) = -infinity
    .interpolate(d3.interpolateHcl);

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

// Load the data values
d3.csv("../../_data/dataset.csv", function(data) {

    // Geodata loaded into the csv scope
    d3.json("assets/data/ne_110m_admin_0_countries_lakes.geojson", function(json) {
        var dataLength = data.length,
            jsonLength = json.features.length;

        // Data (values) forloop
        for (var i = 0; i < dataLength; i++) {
            var countryData = Math.log(data[i][dataValue]),
                dataCountry = data[i][countryValue];

            if (data[i]["Country Name"] === "United States") {
                color.domain([0, countryData]);
            }

            // JSON (geodata) forloop
            for (var j = 0; j < jsonLength; j++) {
                var jsonCountry = json.features[j].properties.name_long;
                if (dataCountry == jsonCountry) {
                    json.features[j].properties.value = countryData;
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
                return value ? color(value) : "#DDD";
            });
    });
});
