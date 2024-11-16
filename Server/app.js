const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const route=require('./routes/server');


const app = express();
app.use(cors());

// app.use(cors({
//     origin: ["http://127.0.0.1:5500", "http://localhost:3000"],

// }));


require('dotenv').config();
const mongourl = process.env.database;
app.use(bodyParser.json());
app.use(express.json());
app.use('/api',route);

mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`server conected on part ${PORT}`))


