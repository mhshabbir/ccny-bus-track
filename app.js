// app.js
// set up an Express server and define routes to fetch bus data and serve a simple HTML page.

import express from 'express';
import { config } from 'dotenv';
import fetch from 'node-fetch';

// Load environment variables
config();

// Constants for MongoDB access
const apiKey = process.env.MONGODB_API_KEY;
const clientAppId = 'data-vnshl';
const databaseName = 'busTrack';
const collectionName = 'buses';
const baseUrl = `https://data.mongodb-api.com/app/${clientAppId}/endpoint/data/v1/action`;

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // For parsing application/json

// Serve a simple HTML page
app.get('/', (req, res) => {
    res.send(`
        <h1>Bus Tracker</h1>
        <p>Enter Bus ID:</p>
        <input type="text" id="busId" />
        <button onclick="fetchBus()">Get Bus Info</button>
        <script>
            function fetchBus() {
                const busId = document.getElementById('busId').value;
                fetch('/bus/' + busId)
                    .then(response => response.json())
                    .then(data => alert(JSON.stringify(data)))
                    .catch(err => alert('Error fetching data'));
            }
        </script>
    `);
});

// API endpoint to fetch bus by ID
app.get('/bus/:busId', async (req, res) => {
    const busId = req.params.busId;
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
        res.json(data.document); // Send the bus data as JSON
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
