const busRoutes = require('../busRoutes.js');
const getWaitTime = require('../getWaitTime.js');

// Define all bus objects in an array
const buses = [
    {
        id: 1,
        location: busRoutes.route_CCNY_145[0], // at ccny stop
        stop: {next:'145', prev:'CCNY'}
    },
    {
        id: 1,
        location: busRoutes.route_CCNY_145[3], // on the way to 145th
        stop: {next: '145', prev: 'CCNY'} 
    },
    {
        id: 1,
        location: [-73.94545, 40.822777], // at 145th
        stop: {next: '145', prev: 'CCNY'} 
    }
];

// Test function
function test_getWaitTime(bus) {
    const [waitTimeCCNY, waitTime125, waitTime145] = getWaitTime.getWaitTime(bus);
    console.log(`The wait times are: CCNY - ${waitTimeCCNY}, 125th Station - ${waitTime125}, 145th Station - ${waitTime145}`);
};

// Run the test for each bus
for (const bus of buses) {
    test_getWaitTime(bus);
}
