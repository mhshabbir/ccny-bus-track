// map_script.js

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-73.9486, 40.8219],  // Initial map center
    zoom: 12
});

// Function to update bus location on the map
function updateBusLocation() {
    fetch('/api/bus/1')
        .then(response => response.json())
        .then(data => {
            if (data.location) {
                // Update the map location
                map.getSource('bus').setData({
                    type: 'Point',
                    coordinates: [data.location.lng, data.location.lat]
                });
                map.flyTo({ center: [data.location.lng, data.location.lat], speed: 0.5 });
            }
        })
        .catch(err => console.error('Error loading the bus data:', err));
}

setInterval(updateBusLocation, 2000);  // Update every 2 seconds
