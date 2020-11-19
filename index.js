const express = require('express');
const app = express();
const PORT = 3000;

app.use('/', (req, res) =>{
    res.json({"mess": "Hello"})
})

app.listen(PORT,() => {console.log("Server started on http://localhost:"+PORT)})

module.exports = app;