// Create map with starting area
let myMap = L.map("map", {
    center: [39.5, -120],
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
    console.log(response);
    let features = response.features;
    for (let i = 0; i < features.length; i++){
        // Feature variables
        let longitude = features[i].geometry.coordinates[0];
        let latitude = features[i].geometry.coordinates[1];
        let depth = features[i].geometry.coordinates[2];
        let magnitude = features[i].properties.mag * 10000;
        let title = features[i].properties.title;
        let milliseconds = features[i].properties.time;
        let dateTime = new Date(milliseconds);
        let formattedDateTime = dateTime.toLocaleString()
        
        // Popup text
        let popup = `<h1>${title}</h1><hr>Latitude: ${latitude}<br>Longitude: ${longitude}<br>Depth: ${depth}<br>Local Datetime: ${formattedDateTime}`;

        L.circle([latitude, longitude],{
            color: "white",
            fillColor: depth,
            fillOpacity: .5,
            radius: magnitude,
            weight: 2
        })
        .bindPopup(popup).addTo(myMap);
    }
});