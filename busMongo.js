const dotenv = require('dotenv');
const fetch = require('node-fetch').default;

dotenv.config();

const apiKey = process.env.MONGODB_API_KEY;
const clientAppId = 'data-vnshl';
const databaseName = 'busTrack';
const collectionName = 'buses';
const baseUrl = `https://us-east-1.aws.data.mongodb-api.com/app/${clientAppId}/endpoint/data/v1/action`;

function readBusData(busId) {
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

    return fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log(`Read Bus Data Response:`, data.document);
            return data.document;
        })
        .catch(error => {
            console.error('Error reading data:', error);
        });
}

function updateLocation(busId, lat, lng) {
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

    return fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log('Update Location Response:', data);
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function updateNextStop(busId, stop) {
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

    return fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log('Update Next Stop Response:', data);
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function updatePrevStop(busId, stop) {
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

    return fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log('Update Prev Stop Response:', data);
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

module.exports = {
    readBusData,
    updateLocation,
    updateNextStop,
    updatePrevStop
};
