require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

app.get('/busLocation', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db('busTrack');
        const buses = database.collection('buses');
        const busLocation = await buses.findOne({ busId: "1" }); // Fetch location of bus 1
        res.json(busLocation.location); // Send location back as response
    } catch (error) {
        res.status(500).send(error);
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
