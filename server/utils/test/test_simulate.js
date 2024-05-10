// test_simulate.js

const { route_CCNY_125, route_125_CCNY, route_CCNY_145, route_145_CCNY } = require('../busRoutes.js');
const { generateRoute } = require('../generateRoute.js');
const { readBusData, updateLocation, updateStop, updateTime} = require('../busMongo.js');
const { getWaitTime } = require('../getWaitTime.js');

// simulating send and recv loop
async function simulate() {
    // generate full route
    const fullRoute = [route_CCNY_145, route_145_CCNY, route_CCNY_125, route_125_CCNY];

    for (let i=0; i<fullRoute.length; i++) {
        const currentRoute = generateRoute(fullRoute[i], 2);
        // update stop
        if(i==0) { await updateStop('1', '145', 'CCNY') }
        else if(i==1) { await updateStop('1', '145', 'CCNY') }
        else if(i==2) { await updateStop('1', 'CCNY', '125') }
        else if(i==3) { await updateStop('1', '125', 'CCNY') };

        for (let j=0; j<currentRoute.length; j++) {

            updateLocation('1', currentRoute[j][0], currentRoute[j][1]);

            const result = await readBusData('1');  
            const bus = result.document;

            const wait = getWaitTime(bus);
            const waitCCNY = wait[0]; 
            const wait125 = wait[1];
            const wait145 = wait[2];  
            await updateTime('1', waitCCNY, wait145, wait125);
        };
    };
};

simulate();