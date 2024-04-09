const busRoutes = require('./busRoutes.js');
const getRoute = require('./getRoute.js');

// Test function
function testGetRoute(route) {
    for (const point of route) {
        console.log(`The route for coordinate ${point} is ${getRoute.getRoute(point)}.`);
    }
}

console.log("Testing getRoute for route 145 to CCNY:");
testGetRoute(busRoutes.route_145_CCNY);

console.log("-----------------------------------------------------------")

console.log("Testing getRoute for route 125 to CCNY:");
testGetRoute(busRoutes.route_125_CCNY);
