const dotenv = require('dotenv');
const fetch = require('node-fetch').default;

dotenv.config();

const apiKey = process.env.MONGODB_API_KEY;
const clientAppId = 'data-vnshl';
const dataSource = 'busCoords';
const databaseName = 'busTrack';
const collectionName = 'buses';
const baseUrl = `https://us-east-1.aws.data.mongodb-api.com/app/${clientAppId}/endpoint/data/v1/action`;

// Generic function to handle MongoDB operations
function mongoDBRequest(action, filter, update) {
    const url = `${baseUrl}/${action}`;
    const body = {
        dataSource,
        database: databaseName,
        collection: collectionName,
        filter,
        ...(update && { update })  
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
            console.log(`${action} Response:`, data);
            return data;
        })
        .catch(error => {
            console.error(`Error during ${action}:`, error);
        });
}

function readBusData(busId) {
    return mongoDBRequest('findOne', { busId });
}

function updateLocation(busId, lat, lng) {
    return mongoDBRequest('updateOne', { busId }, { $set: { location: { lat, lng } } });
}

function updateStop(busId, next, prev) {
    return mongoDBRequest('updateOne', { busId }, { $set: { stop: { next, prev } } });
}

function updateTime(busId, ccny, uptown, downtown) {
    return mongoDBRequest('updateOne', { busId }, { $set: { wait: { ccny, uptown, downtown } } });
}

module.exports = {
    readBusData,
    updateLocation,
    updateStop,
    updateTime
};
