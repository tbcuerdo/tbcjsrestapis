const { FILE } = require('dns');
const fs = require('fs');
const mysql = require('../helpers/mysqlconn')
const FILE_NAME = './assets/pies.json';

// create a get function to read the pies from a json file
const get = (resolve, reject) => {
    console.log('get...');

    mysql.exec('SELECT * FROM pies', (results) => {
        resolve(results);
    },(err) => {
        reject(err)
    },[]);
};

// create an insert function to add the new pie in the list of pies inside the json file
const insert = (newData, resolve, reject) => {
    console.log('insert...')

    mysql.exec('INSERT INTO pies SET ?', (results) => {
            resolve(results.insertId);
    },(err) => {
        reject(err)
    }, newData);
};

// create a get by id function that will retrieve the pie based on id
const getById = (id, resolve, reject) => {
    console.log('getById...');
    
    mysql.exec('SELECT * FROM pies WHERE id = ?', (results) => {
        resolve(results);
    }, (err) => {
        reject(err)
    }, id);
}

// create an update function that will replace the pie details
const update = (id, updateData, resolve, reject) => {
    console.log('update...');

    mysql.exec('UPDATE pies SET name = ?, price = ? where id = ?', (results) => {
        if (results.affectedRows == 0) {
            reject({
                code: 'NOT_FOUND',
                message: 'Update failed. No rows matched.'
            });
        } else {
            resolve(updateData);
        }
    }, (err) => {
        reject(err)
    }, updateData.name, updateData.price, id);
};

const remove = (id, resolve, reject) => {
    console.log('remove');

    mysql.exec('DELETE from pies where id = ?', (results) => {
        if (results.affectedRows == 0) {
            reject({
                code: 'NOT_FOUND',
                message: 'Delete failed. No rows matched.'
            });
        } else {
            resolve(id);
        }
    }, (err) => {
        reject(err)
    }, id);
};

let pieRepo = {
    get: get,
    insert: insert,
    getById: getById,
    update: update,
    remove: remove
};

module.exports = pieRepo;