const getDistance = require('./getDistance.js')
const busRoutes = require('./busRoutes.js');
const atStop = require('./atStop.js');

// Helper function to find the closest coordinate index in a route
function closestIndex(route, coord) {
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < route.length; i++) {
        let distance = getDistance.calculateEuclideanDistance(coord, route[i]);
        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
        }
    }

    return closestIndex;
}

function getWaitTime(bus) {
    currentCoord = [bus.location.lat, bus.location.lng]
    nextStop = bus.stop.next
    previousStop = bus.stop.prev

    const stop = atStop.atStop(currentCoord);
    let waitTimes = [0, 0, 0]; // Initialize wait times for [CCNY, 125th Station, 145th Station]

    if (stop) { // we are currently at a stop
        if (stop === "CCNY") {
            if (nextStop === '145') { // next stop is 125
                waitTimes = [
                    0, 
                    busRoutes.route_CCNY_145_time + busRoutes.route_CCNY_145_time + busRoutes.route_CCNY_125_time, 
                    busRoutes.route_CCNY_145_time
                ];
            }
            
            else { // next stop is 125
                waitTimes = [
                    0, 
                    busRoutes.route_CCNY_125_time, 
                    busRoutes.route_CCNY_125_time + busRoutes.route_125_CCNY_time + busRoutes.route_CCNY_145_time
                ];
            }
        } 
        
        else if (stop === "125") { // at 125
            waitTimes = [busRoutes.route_125_CCNY_time, 0, busRoutes.route_125_CCNY_time + busRoutes.route_CCNY_145_time];
        } 
        
        else if (stop === "145") { // at 145
            waitTimes = [busRoutes.route_145_CCNY_time, busRoutes.route_145_CCNY_time + busRoutes.route_CCNY_125_time, 0];
        }
    } 
    
    else {  // on route 
        if (nextStop === "125") {
            route = busRoutes.route_CCNY_125;
            waitTimes[1] = busRoutes.route_CCNY_125_time - closestIndex(route, currentCoord);
            waitTimes[0] = waitTimes[1] + busRoutes.route_125_CCNY.length;
            waitTimes[2] = waitTimes[0] + busRoutes.route_CCNY_145.length;
        } 
        
        else if (nextStop === "CCNY" && previousStop === '125') {
            route = busRoutes.route_125_CCNY;
            waitTimes[0] = busRoutes.route_125_CCNY_time - closestIndex(route, currentCoord);
            waitTimes[1] = waitTimes[0] + busRoutes.route_CCNY_125_time;
            waitTimes[2] = waitTimes[1] + busRoutes.route_CCNY_145_time;
        } 
        
        else if (nextStop === "145") {
            route = busRoutes.route_CCNY_145;
            waitTimes[2] = busRoutes.route_CCNY_145_time - closestIndex(route, currentCoord);
            waitTimes[0] = waitTimes[2] + busRoutes.route_145_CCNY_time;
            waitTimes[1] = waitTimes[0] + busRoutes.route_CCNY_125_time;
        } 
        
        else if (nextStop === "CCNY" && previousStop === '145') {
            route = busRoutes.route_145_CCNY;
            waitTimes[0] = busRoutes.route_145_CCNY_time - closestIndex(route, currentCoord);
            waitTimes[2] = waitTimes[0] + busRoutes.route_CCNY_145_time;
            waitTimes[1] = waitTimes[2] + busRoutes.route_CCNY_125_time;
        }
    }

    return waitTimes;
}

module.exports = { getWaitTime };