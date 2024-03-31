require('dotenv').config();
const { MongoClient } = require('mongodb');

// MongoDB URI and client setup from environment variables
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Fixed route information with School and 145th Station coordinates and wait times
const route = {
    "School to 145th Station": [
        [40.819798, -73.949775, 9],
        [40.820287, -73.949422, 8],
        [40.820881, -73.949000, 7],
        [40.821507, -73.948525, 6],
        [40.822128, -73.948076, 5],
        [40.822744, -73.947639, 4],
        [40.823378, -73.947175, 3],
        [40.823978, -73.946734, 2],
        [40.824604, -73.946238, 1],
        [40.824003, -73.944914, 0]
    ],
    "145th Station to School": [
        [40.824003, -73.944914, 8],
        [40.822777, -73.945450, 7],
        [40.821382, -73.946106, 6],
        [40.821772, -73.947161, 5],
        [40.822148, -73.948064, 4],
        [40.821507, -73.948525, 3],
        [40.820881, -73.949000, 2],
        [40.820287, -73.949422, 1],
        [40.819798, -73.949775, 0],
    ]
};

// School and 145th Station fixed coordinates
const schoolCoords = [40.819818, -73.949769];
const stationCoords = [40.823907, -73.944946];

async function fetchBusLocations(busId) {
  try {
    await client.connect();
    const database = client.db('busTrack');
    const buses = database.collection('buses');
    
    // Fetch the document for the given busId
    const busDoc = await buses.findOne({ busId: busId });
    
    if (!busDoc) {
      throw new Error(`No location data found for busId: ${busId}`);
    }

    // Return currentLocation and previousLocation directly from the document
    return {
      currentLocation: [busDoc.location.lng, busDoc.location.lat],
      previousLocation: [busDoc.prev_location.lng, busDoc.prev_location.lat]
    };
  } finally {
    await client.close();
  }
}

function determineDirectionAndNextStop(currentLocation, previousLocation) {
  // Calculate distances to school and station from current and previous locations
  const distToSchoolCurr = Math.hypot(schoolCoords[0] - currentLocation[1], schoolCoords[1] - currentLocation[0]);
  const distToSchoolPrev = Math.hypot(schoolCoords[0] - previousLocation[1], schoolCoords[1] - previousLocation[0]);
  const distToStationCurr = Math.hypot(stationCoords[0] - currentLocation[1], stationCoords[1] - currentLocation[0]);
  const distToStationPrev = Math.hypot(stationCoords[0] - previousLocation[1], stationCoords[1] - previousLocation[0]);

  let direction, nextStopInfo;
  if (distToSchoolCurr < distToSchoolPrev && distToSchoolCurr < distToStationCurr) {
    direction = "School to 145th Station";
    nextStopInfo = route[direction][0]; // Next stop is the first in the direction route
  } else if (distToStationCurr < distToStationPrev && distToStationCurr < distToSchoolCurr) {
    direction = "145th Station to School";
    nextStopInfo = route[direction][0]; // Next stop is the first in the direction route
  } else {
    // If the direction can't be determined
    return { direction: "Unknown", nextStop: "Unknown", waitTime: "Unknown" };
  }

  // Return direction, next stop coordinates, and wait time
  return {
    direction: direction,
    nextStopCoords: nextStopInfo.slice(0, 2),
    waitTime: nextStopInfo[2]
  };
}

// busId 1 for 145th and 2 for 125th
async function bus_info(busId) {
  const { currentLocation, previousLocation } = await fetchBusLocations(busId);
  const info = determineDirectionAndNextStop(currentLocation, previousLocation);
  
  console.log(`Direction: ${info.direction}`);
  console.log(`Next Stop Coordinates: Lat ${info.nextStopCoords[1]}, Lng ${info.nextStopCoords[0]}`);
  console.log(`Estimated Wait Time: ${info.waitTime} minutes`);
}