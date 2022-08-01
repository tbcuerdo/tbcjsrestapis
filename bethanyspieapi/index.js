const express = require('express');
const server = express();
const pieRepo = require('./repos/pieRepo')

server.get('/', (req, res) => {
    pieRepo.get((data) => {
        console.log('from index: '+data);
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All pies retrieved.",
            "data": data
        })
    },
    (err) => { next(err) });
});

server.get('/api/', (req, res) => {
    res.send('Apple');
});

server.listen('4242', () => {
    console.log('Express server is running...');
});