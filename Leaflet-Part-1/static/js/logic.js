// Create map with starting area
let myMap = L.map("map", {
    center: [39.5, -120],
    zoom: 6
});

// Base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// API variables. Set date range first week of Sept 2024
let baseURL = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson";
let starttime = "&starttime=2024-09-01"
let endtime = "&endtime=2024-09-07"
let limit = "&limit=100"

let url = baseURL + starttime + endtime + limit;

d3.json(url).then(function(response){
    console.log(response)
});