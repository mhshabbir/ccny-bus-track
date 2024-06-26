const busRoutes = require('../busRoutes.js');
const generateRoute = require('../generateRoute.js');

// Test function
function testGenerateRoute(route, numPoints) {
    // Generate points along the route with interpolation
    const sampleRoutePoints = generateRoute.generateRoute(route, numPoints);

    console.log(sampleRoutePoints);
}

console.log("Testing route generation for route 145 to CCNY:");
testGenerateRoute(busRoutes.route_145_CCNY, 5);
