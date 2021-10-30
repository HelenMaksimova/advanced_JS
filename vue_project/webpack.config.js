const path = require('path');

const config = {
    entry: './src/index.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'build')
    }
};

module.exports = config;
