// test_updateMongo.js

const { updateLocation, updateStop, updateTime, readBusData } = require('../busMongo.js');
const assert = require('assert');


async function testUpdateLocation() {
    const busId = "1";
    const newLat = -74.005974;
    const newLng = 40.712776;

    await updateLocation(busId, newLat, newLng);
    const updatedBusData = await readBusData(busId);

    assert.strictEqual(updatedBusData.document.location.lat, newLat, "Latitude did not update correctly");
    assert.strictEqual(updatedBusData.document.location.lng, newLng, "Longitude did not update correctly");
}

async function testUpdateStop() {
    const busId = "1";
    const nextStop = "145";
    const prevStop = "CCNY";

    await updateStop(busId, nextStop, prevStop);
    const updatedBusData = await readBusData(busId);

    assert.strictEqual(updatedBusData.document.stop.next, nextStop, "Next stop did not update correctly");
    assert.strictEqual(updatedBusData.document.stop.prev, prevStop, "Previous stop did not update correctly");
}

async function testUpdateTime() {
    const busId = "1";
    const ccny = 5;
    const uptown = 10; 
    const downtown = 8; 

    await updateTime(busId, ccny, uptown, downtown);
    const updatedBusData = await readBusData(busId);

    assert.strictEqual(updatedBusData.document.wait.ccny, ccny, "CCNY wait time did not update correctly");
    assert.strictEqual(updatedBusData.document.wait.uptown, uptown, "Uptown wait time did not update correctly");
    assert.strictEqual(updatedBusData.document.wait.downtown, downtown, "Downtown wait time did not update correctly");

}

async function runTests() {
    await testUpdateLocation();
    await testUpdateStop();
    await testUpdateTime(); 
}

runTests();
