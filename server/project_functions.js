const fs = require('fs');

const readData = function (filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf-8', (error, data) => {
            if (error) {
                reject(error);
            }
            resolve(JSON.parse(data));
        });
    });
}

const writeData = function (filepath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, JSON.stringify(data), (error) => {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
}

const addItem = function (filepath, item) {
    return new Promise((resolve, reject) => {
        readData(filepath).then((items) => {
            const resultItems = [...items];
            const itemIndex = resultItems.findIndex(element => element.id === item.id);
            if (itemIndex > -1) {
                resultItems[itemIndex].quantity += 1;
            } else {
                resultItems.push({...item, quantity: 1})
            }
            writeData(filepath, resultItems).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    });
}

const deleteItem = function (filepath, id) {
    return new Promise((resolve, reject) => {
        readData(filepath).then((items) => {
            const dataItems = [...items];
            const resultItems = dataItems.filter(element => +element.id !== +id);
            writeData(filepath, resultItems).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    });
}

module.exports = { addItem, deleteItem }
