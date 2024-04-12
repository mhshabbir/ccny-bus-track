require('dotenv').config();
import('node-fetch').then(module => {
    const fetch = module.default; 
    const apiKey = process.env.MONGODB_API_KEY;
    const clientAppId = 'data-vnshl'; 
    const databaseName = 'busTrack';
    const collectionName = 'buses';
    const baseUrl = `https://us-east-1.aws.data.mongodb-api.com/app/${clientAppId}/endpoint/data/v1/action`;

    // Function to fetch a bus by ID
    async function fetchBusById(busId) {
        const url = `${baseUrl}/findOne`;
        const body = {
            dataSource: 'busCoords', 
            collection: collectionName,
            filter: { busId: busId }
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify(body),
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log('Bus Data:', data);
            return data; // This contains the bus information
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Function to update bus information
    async function updateBusInfo(busId, updates) {
        const url = `${baseUrl}/updateOne`;
        const body = {
            dataSource: 'busCoords', 
            database: databaseName,
            collection: collectionName,
            filter: { busId: busId },
            update: {
                $set: updates,
            }
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify(body),
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log('Update Response:', data);
            return data; // This contains the response from the update operation
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Example usage
    fetchBusById("1").then(bus => console.log(bus));
    
    // Example updating bus information
    updateBusInfo("1", { 
        location: { lat: 40.712776, lng: -74.005974 }, 
        nextStop: "145", 
        prevStop: "CCNY" 
    });
});
