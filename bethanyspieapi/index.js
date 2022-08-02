const express = require('express');
const app = express();
const pieRepo = require('./repos/pieRepo')

// Configure middleware to support JSON data parsing in the request object
app.use(express.json())

// Create a GET api to retrieve all the pies
// app.get('/', (req, res, next) => {
//     pieRepo.get((data) => {
//         res.status(200).json({
//             "status": 200,
//             "statusText": "OK",
//             "message": "All pies retrieved.",
//             "data": data
//         })
//     },
//     (err) => { next(err) });
// });

// create a GET api to retrieve 1 pie by id
app.get('/:id', (req, res, next) => {
    let id = req.params.id;
    pieRepo.getById(id, (data) => {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All pies retrieved.",
            "data": data
        })
    },
    (err) => { next(err) });
});

// create a POST api to save 1 pie
app.post('/', (req, res, next) => {
    let newData = req.body;
    pieRepo.insert(newData, (data) => {
        res.status(201).json({
            "status": 201,
            "statusText": "OK",
            "message": "Pie successfully saved.",
            "data": data
        })
    },
    (err) => { next(err) });
});

// create a put api to update a pie
app.put('/:id', (req, res, next) => {
    let newData = req.body;
    let id = req.params.id;
    pieRepo.getById(id, (data) => {
        if (data) {
            pieRepo.update(id, newData, (data) => {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Pie successfully updated.",
                    "data": data
                })
            });
        } else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not found.",
                "message": "The pie "+id+" could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "Not found"
                }
            })
        }
    }, (err) => next(err))
    
});

app.get('/api/', (req, res) => {
    res.send('Apple');
});

app.listen('4242', () => {
    console.log('Express server is running...');
});