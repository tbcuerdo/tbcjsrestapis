const fs = require('fs');
const FILE_NAME = './assets/pies.json';
let pieRepo = {
    get: async (resolve, reject) => {
        let rs = fs.createReadStream(FILE_NAME);
        rs.on('data', (data) => {
            console.log('data retrieved.')
            let parsed = JSON.parse(data)
            return resolve(parsed);
        });
        rs.on('error', (err) => {
            console.log('error: ' + err);
            return reject(err);
        });

    }
};

module.exports = pieRepo;