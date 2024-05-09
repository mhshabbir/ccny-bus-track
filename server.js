// server.js

const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Client Setup
const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));
app.use(express.json());  // For parsing application/json

// Routes
app.get('/api/bus/:id', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("busTrack");
        const buses = database.collection("buses");
        const bus = await buses.findOne({ busId: req.params.id });
        res.json(bus);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching data from the database.");
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
