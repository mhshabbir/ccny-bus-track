import { updateLocation, updateNextStop, updatePrevStop, readBusData } from './busMongo'; 

describe('MongoDB Update Tests', () => {
    it('should update the location of the bus', async () => {
        const busId = "1";
        const newLat = -74.005974;
        const newLng = 40.712776;
        await updateLocation(busId, newLat, newLng);

        const updatedBusData = await readBusData(busId);
        expect(updatedBusData.location.lat).toBe(newLat);
        expect(updatedBusData.location.lng).toBe(newLng);
    });

    it('should update the next stop of the bus', async () => {
        const busId = "1";
        const nextStop = "CCNY";
        await updateNextStop(busId, nextStop);

        const updatedBusData = await readBusData(busId);
        expect(updatedBusData.nextStop).toBe(nextStop);
    });

    it('should update the previous stop of the bus', async () => {
        const busId = "1";
        const prevStop = "145";
        await updatePrevStop(busId, prevStop);

        const updatedBusData = await readBusData(busId);
        expect(updatedBusData.prevStop).toBe(prevStop);
    });
});
