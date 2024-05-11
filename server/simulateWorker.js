// simulateWorker.js
const { parentPort } = require('worker_threads');

function simulate() {
    // Your simulation code here
    // This can loop, calculate, or process data as needed
}

setInterval(simulate, 1000); // Run simulate function every second

parentPort.on('message', (msg) => {
    if (msg === 'stop') {
        parentPort.close(); // Close the worker thread if 'stop' message is received
    }
});
