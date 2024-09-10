// Create map with starting area
let myMap = L.map("map", {
    center: [61.58, -149.44],
    zoom: 6
});

// Base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// API URL for previous week
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Retrieve data from API
d3.json(url).then(function(response){
    let features = response.features;

    // For loop to access features
    for (let i = 0; i < features.length; i++){
        // Feature variables
        let longitude = features[i].geometry.coordinates[0];
        let latitude = features[i].geometry.coordinates[1];
        let depth = features[i].geometry.coordinates[2];
        let magnitude = features[i].properties.mag;
        let title = features[i].properties.title;
        let milliseconds = features[i].properties.time;
        let dateTime = new Date(milliseconds);
        let formattedDateTime = dateTime.toLocaleString();
        
        // Marker color logic
        let color = "";
        if (depth < 10){color = "#feedde"}
        else if (depth < 30){color = "#fdd0a2"}
        else if (depth < 50){color = "#fdae6b"}
        else if (depth < 70){color = "#fd8d3c"}
        else if (depth < 90){color = "#f16913"}
        else if (depth < 110){color = "#d94801"}
        else {color = "#8c2d04"};

        // Popup text
        let popup = `<h1>${title}</h1><hr>Latitude: ${latitude}<br>Longitude: ${longitude}<br>Depth: ${depth}
        <br>Magnitude: ${magnitude}<br>Local Datetime: ${formattedDateTime}`;

        // Markers
        L.circle([latitude, longitude],{
            color: "black",
            fillColor: color,
            fillOpacity: .5,
            radius: (magnitude **2)*4000,
            weight: 2
        })
        .bindPopup(popup).addTo(myMap);
    };

    // Legend
    let legend = L.control({ position: "bottomright" }); 
    legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let limits =["<10", "10-30", "30-50", "50-70", "70-90", "90-110", "110+"]
    let colors = ["#feedde", "#fdd0a2", "#fdae6b", "#fd8d3c","#f16913", "#d94801", "#8c2d04"]
    let labels = [];

    let legendInfo = "<h1>Earthquake Depth</h1>" +
      "<div class=\"labels\">" +
        "<div class=limit>" + limits[0] + "</div>" + 
        "<div class=limit>" + limits[1] + "</div>" + 
        "<div class=limit>" + limits[2] + "</div>" + 
        "<div class=limit>" + limits[3] + "</div>" +
        "<div class=limit>" + limits[4] + "</div>" +
        "<div class=limit>" + limits[5] + "</div>" +
        "<div class=limit>" + limits[6] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  legend.addTo(myMap);

});