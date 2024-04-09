const busRoutes = require('./busRoutes.js');
const atStop = require('./atStop.js');

// Test function
function testAtStop(route) {
    route.forEach((coord, index) => {
        const stop = atStop.atStop(coord);
        if (stop) {
            console.log(`At coordinate ${index}, the bus is at ${stop}.`);
        }
    });
}

console.log("Testing route 145 to CCNY:");
testAtStop(busRoutes.route_145_CCNY);

console.log("-----------------------------------------------------------")

console.log("Testing route CCNY to 145:");
testAtStop(busRoutes.route_CCNY_145);

console.log("-----------------------------------------------------------")

console.log("Testing route 125 to CCNY:");
testAtStop(busRoutes.route_125_CCNY);

console.log("-----------------------------------------------------------")

console.log("Testing route CCNY to 125:");
testAtStop(busRoutes.route_CCNY_145);
