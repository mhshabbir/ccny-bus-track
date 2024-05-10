// test_updateMongo.js

const { updateLocation, updateNextStop, updatePrevStop, readBusData } = require('./busMongo.js');

async function testUpdateLocation() {
    const busId = "1";
    const newLat = -74.005974;
    const newLng = 40.712776;
    await updateLocation(busId, newLat, newLng);
    const updatedBusData = await readBusData(busId);
    console.log('Updated Location:', updatedBusData.location);
}

async function testUpdateNextStop() {
    const busId = "1";
    const nextStop = "CCNY";
    await updateNextStop(busId, nextStop);
    const updatedBusData = await readBusData(busId);
    console.log('Updated Next Stop:', updatedBusData.nextStop);
}

async function testUpdatePrevStop() {
    const busId = "1";
    const prevStop = "145";
    await updatePrevStop(busId, prevStop);
    const updatedBusData = await readBusData(busId);
    console.log('Updated Previous Stop:', updatedBusData.prevStop);
}

async function runTests() {
    await testUpdateLocation();
    await testUpdateNextStop();
    await testUpdatePrevStop();
}

runTests();