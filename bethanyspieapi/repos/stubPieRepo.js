const { FILE } = require('dns');
const fs = require('fs');
const FILE_NAME = './assets/pies.json';

// create a get function to read the pies from a json file
const get = (resolve, reject) => {
    console.log('get...');
    let rs = fs.createReadStream(FILE_NAME);

    // once data is available invoke the callback with the data
    rs.on('data', (data) => {
        let parsed = JSON.parse(data)
        resolve(parsed);
    });

    // in case of an error on the read stream invoke the reject callback
    rs.on('error', (err) => {
        reject(err);
    });
};

// create an insert function to add the new pie in the list of pies inside the json file
const insert = (newData, resolve, reject) => {
    console.log('insert...')

    // retrieve saved pies, add new pies and write to file
    get((data) => {
        data.push(newData);

        // write to file and send back data
        let ws = fs.createWriteStream(FILE_NAME);
        ws.write( JSON.stringify(data), () => {
            resolve(data);
        });

        // call reject when the writestream encounters an error
        ws.on('error', (err) => {
            reject(err);
        });
    }, (err) => {
        reject(err);
    });
};

// create a get by id function that will retrieve the pie based on id
const getById = (id, resolve, reject) => {
    console.log('getById...');
    get((data) => {

        // find pie by id
        let pie = data.find(p => p.id == id);

        // write to file and send back data
        if (pie) {
            resolve(pie);
        }
        resolve();

    }, (err) => {
        reject(err);
    });
}

// create an update function that will replace the pie details
const update = (id, newData, resolve) => {
    console.log('update...');

    // retrieve saved pies, add new pies and write to file
    get((data) => {

        let pie = data.find(p => p.id == id);
        if (pie) {
            Object.assign(pie, newData);
        }

        // write to file and send back data
        let ws = fs.createWriteStream(FILE_NAME);
        ws.write( JSON.stringify(data), () => {
            console.log("Writing ended");
            resolve(data);
        });

        // call reject when the writestream encounters an error
        ws.on('error', (err) => {
            console.log('error: ' + err);
            reject(err);
        });
    });
};

const remove = (id, resolve) => {
    console.log('remove');

    get((data) => {

        // find pie by id
        let index = data.findIndex(p => p.id == id);

        // write to file and send back data
        if (index != -1) {
            data.splice(index, 1);
            
            let ws = fs.createWriteStream(FILE_NAME);
            ws.write( JSON.stringify(data), () => {
                console.log("Writing ended");
                resolve(index);
            }, (err) => {
                reject(err);
            });

        } else {
            console.log('No matching pie found.')
        }

    }, (err) => {
        reject(err);
    });
};

let pieRepo = {
    get: get,
    insert: insert,
    getById: getById,
    update: update,
    remove: remove
};

module.exports = pieRepo;