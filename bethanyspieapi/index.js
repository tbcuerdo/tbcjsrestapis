const express = require('express');
const app = express();
const pieRepo = require('./repos/pieRepo')

app.use(express.json())

app.get('/', (req, res, next) => {
    pieRepo.get((data) => {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All pies retrieved.",
            "data": data
        })
    },
    (err) => { next(err) });
});

app.post('/', (req, res, next) => {
    let newData = req.body;
    console.log('newData: ', newData)
    if (!!newData) {
        pieRepo.insert(newData, (data) => {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Pie successfully saved.",
                "data": data
            })
        },
        (err) => { next(err) });
    } else {
        console.log('No req body defined.')
    }
});

app.get('/api/', (req, res) => {
    res.send('Apple');
});

app.listen('4242', () => {
    console.log('Express server is running...');
});