// server.js
const express = require('express');
const cors = require('cors');
const { simulate } = require('./utils/test/test_simulate.js');

const app = express();
app.use(cors());
const port = 5000;

app.get('/api/busData', async (req, res) => {
    const result = await readBusData('1');  // Assume this fetches the latest bus data
    res.json(result.document);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    simulate(); // Start the simulation when the server starts
});
