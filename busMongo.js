require('dotenv').config();
import('node-fetch').then(module => {
    const fetch = module.default; // Correctly access the default export
    const apiKey = process.env.MONGODB_API_KEY;
    const clientAppId = 'data-vnshl'; // Use the correct Client App ID
    const databaseName = 'busTrack';
    const collectionName = 'buses';
    const baseUrl = `https://us-east-1.aws.data.mongodb-api.com/app/${clientAppId}/endpoint/data/v1/action`;

    // Function to read bus data by ID
    async function readBusData(busId) {
        const url = `${baseUrl}/findOne`;
        const body = {
            dataSource: 'busCoords',
            database: databaseName,
            collection: collectionName,
            filter: { busId }
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
            console.log(`Read Bus Data Response:`, data.document);
            return data.document; // Return the fetched document
        } catch (error) {
            console.error('Error reading data:', error);
        }
    }

    // Function to update bus location by ID
    async function updateLocation(busId, lat, lng) {
        const url = `${baseUrl}/updateOne`;
        const body = {
            dataSource: 'busCoords',
            database: databaseName,
            collection: collectionName,
            filter: { busId: busId },
            update: {
                $set: {
                    location: { lat: lat, lng: lng }
                }
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
            console.log('Update Location Response:', data);
            return data; // This contains the response from the update operation
        } catch (error) {
            console.error('Error:', error);
        }
    }
    // Example updating bus location
    updateLocation("1", -74.005974, 40.712776);
    readBusData("1")

    // Function to update bus location by ID
    async function updateNextStop(busId, stop) {
        const url = `${baseUrl}/updateOne`;
        const body = {
            dataSource: 'busCoords',
            database: databaseName,
            collection: collectionName,
            filter: { busId: busId },
            update: {
                $set: {
                    nextStop: stop
                }
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
            console.log('Update Next Stop Response:', data);
            return data; // This contains the response from the update operation
        } catch (error) {
            console.error('Error:', error);
        }
    }
    // Example updating bus location
    updateNextStop("1", "CCNY");
    readBusData("1");


    // Function to update bus location by ID
    async function updatePrevStop(busId, stop) {
        const url = `${baseUrl}/updateOne`;
        const body = {
            dataSource: 'busCoords',
            database: databaseName,
            collection: collectionName,
            filter: { busId: busId },
            update: {
                $set: {
                    prevStop: stop
                }
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
            console.log('Update Location Response:', data);
            return data; // This contains the response from the update operation
        } catch (error) {
            console.error('Error:', error);
        }
    }
    // Example updating bus location
    updatePrevStop("1", "145");
    readBusData("1");
});
