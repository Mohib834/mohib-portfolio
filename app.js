const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require('path');
const publicDir = path.join(__dirname, '/dist')


app.use(express.static(publicDir));
app.get('/', (req, res) => {
    res.render('index.html');
})

app.listen(port);