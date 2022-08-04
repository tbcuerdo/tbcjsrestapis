const express = require('express');
const app = express();
const pieRepo = require('./repos/pieRepo')
const router = express.Router();

// Configure middleware to support JSON data parsing in the request object
app.use(express.json())

// Create a GET api to retrieve all the pies
router.route('/')
.get((req, res, next) => {
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

// create a GET api to retrieve 1 pie by id
router.route('/:id')
.get((req, res, next) => {
    let id = req.params.id;
    pieRepo.getById(id, (data) => {
        if (data.length > 0){
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Pie "+id+" retrieved.",
                "data": data[0]
            })
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
        
    },
    (err) => { next(err) });
});

// create a POST api to save 1 pie
router.route('/')
.post((req, res, next) => {
    let newData = req.body;
    pieRepo.insert(newData, (id) => {
        res.status(201).json({
            "status": 201,
            "statusText": "CREATED",
            "message": "Pie successfully saved.",
            "data": id
        })
    },
    (err) => { next(err) });
});

// create a put api to update a pie
router.route('/:id')
.put((req, res, next) => {
    let newData = req.body;
    let id = req.params.id;
    
    pieRepo.update(id, newData, (data) => {
        res.status(200).json({
            "status": 200,
            "statusText": "UPDATED",
            "message": "Pie successfully updated.",
            "data": data
        });
    }, (err) => {
        if (err && err.code && err.code == 'NOT_FOUND') {
            res.status(404).json({
                "status": 404,
                "statusText": "Not found.",
                "message": "The pie "+id+" could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "Not found"
                }
            });
        } else {
            next(err);
        }
    });
});

//create a delete api that takes an id
router.route('/:id')
.delete((req, res, next) => {
    let id = req.params.id;
    pieRepo.remove(id, (data) => {
        res.status(200).json({
            "status": 200,
            "statusText": "DELETED",
            "message": "Pie successfully deleted.",
            "data": data
        });
    }, (err) => {
        if (err && err.code && err.code == 'NOT_FOUND') {
            res.status(404).json({
                "status": 404,
                "statusText": "Not found.",
                "message": "The pie "+id+" could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "Not found"
                }
            });
        } else {
            next(err);
        }
    });
});

// set base url
app.use('/api', router);

app.listen('4242', () => {
    console.log('Express server is running...');
});