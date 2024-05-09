const busRoutes = require('./busRoutes.js');
const getWaitTime = require('./getWaitTime.js');


// test bus
// const bus = {
//     id: 1,
//     currentCoord: busRoutes.route_CCNY_145[3],
//     nextStop: '145',
//     previousStop: 'CCNY'
// };

const bus = {
    id: 1,
    currentCoord: busRoutes.route_CCNY_145[0], // at ccny stop
    nextStop: '145',
    previousStop: 'CCNY'
}; // shows waittime for 145 

// const bus = {
//     id: 1,
//     currentCoord: [ -73.94545, 40.822777 ],
//     nextStop: '145',
//     previousStop: 'CCNY'
// };

// Test function
function test_getWaitTime(bus) {
    const [waitTimeCCNY, waitTime125, waitTime145] = getWaitTime.getWaitTime(bus);
    console.log(`The wait times are: CCNY - ${waitTimeCCNY}, 125th Station - ${waitTime125}, 145th Station - ${waitTime145}`);
};

// Run the test
test_getWaitTime(bus);
