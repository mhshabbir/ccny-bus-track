const busRoutes = require('./busRoutes.js');
const getRoute = require('./getRoute.js');

// Test function
function testGetRoute(route) {
    for (const point of route) {
        console.log(`The route for coordinate ${point} is ${getRoute.getRoute(point)}.`);
    }
}

console.log("Testing getRoute for route 145:");
testGetRoute(busRoutes.route145);

console.log("-----------------------------------------------------------")

console.log("Testing getRoute for route 125:");
testGetRoute(busRoutes.route125);
