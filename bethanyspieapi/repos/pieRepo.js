const { FILE } = require('dns');
const fs = require('fs');
const FILE_NAME = './assets/pies.json';

const get = (resolve, reject) => {
    let rs = fs.createReadStream(FILE_NAME);
    rs.on('data', (data) => {
        console.log('data retrieved.')
        let parsed = JSON.parse(data)
        resolve(parsed);
    });
    rs.on('error', (err) => {
        console.log('error: ' + err);
        reject(err);
    });
};

const insert = (newData, resolve, reject) => {
    console.log('insert...')

    // retrieve saved pies, add new pies and write to file
    get((data) => {
        data.push(newData);

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
    }, (err) => {
        reject(err);
    });
};

let pieRepo = {
    get: get,
    insert: insert
};

module.exports = pieRepo;