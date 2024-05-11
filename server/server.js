// server.js
const cors = require('cors');
const express = require('express');
const { Worker } = require('worker_threads');

const { simulate } = require('./utils/test/test_simulate.js');
const { readBusData } = require('./utils/busMongo.js');


const app = express();
app.use(cors({
    origin: 'https://super-duper-waffle-4q95j7grwwjfjx7r-5173.app.github.dev', // frontend URL
    methods: ['GET', 'POST', 'OPTIONS'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
}));
app.options('*', cors()); // include before other routes
const port = 5000;


app.get('/api/busData', async (req, res) => {
    console.log("Recieved req for api/busData");
    const result = await readBusData('1'); 
    res.json(result.document);
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);

    // Start the worker thread for simulation
    const worker = new Worker('./simulateWorker.js');
    worker.on('message', message => console.log('Message from worker:', message));
    worker.on('error', error => console.error('Worker error:', error));
    worker.on('exit', code => console.log(`Worker stopped with exit code ${code}`));

    // Optionally, handle messages from the worker
    worker.postMessage('start');

    // Example of sending a stop message to the worker after a certain time
    setTimeout(() => {
        worker.postMessage('stop');
    }, 60000); // Stop after 60 seconds
});