const express = require('express');
const app = express();
const cors = require('cors');
const evaluatorRouter = require('./routes/evaluator.js')
const resultRouter = require('./routes/result.js')

require('dotenv').config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/getResult', evaluatorRouter);
app.use(resultRouter);
module.exports = app.listen(port, ()=> {
    console.log("Server running on port", port);
});

