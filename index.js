const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, 'dist');
console.log(__dirname);

app.use(express.static(publicDirectory));

console.log('hello');
app.listen(port)
