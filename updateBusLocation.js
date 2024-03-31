const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI; // Ensure this is set in your .env file
const client = new MongoClient(uri);

const busCoords = [
    [-73.949699, 40.819938],
    [-73.949261, 40.820549],
    [-73.948621, 40.821416],
    [-73.948185, 40.821970],
    [-73.947185, 40.823358],
    [-73.946292, 40.824560],
    [-73.944891, 40.824014],
    [-73.946099, 40.821369],
    [-73.948048, 40.822093],
    [-73.949699, 40.819938]
];

let currentIndex = 0;

async function updateBusLocation() {
    try {
        await client.connect();
        const database = client.db("busTrack");
        const buses = database.collection("buses");

        const newLocation = {
            $set: {
                "location.lat": busCoords[currentIndex][1],
                "location.lng": busCoords[currentIndex][0],
            },
        };

        // Update the location for a specific bus (e.g., busId: "1")
        await buses.updateOne({ busId: "1" }, newLocation);

        console.log(`Bus location updated: ${busCoords[currentIndex]}`);
        currentIndex = (currentIndex + 1) % busCoords.length;
    } catch (err) {
        console.error("Failed to update bus location:", err);
    } finally {
        await client.close();
    }
}

// Update bus location every 2 seconds
setInterval(updateBusLocation, 2000);
