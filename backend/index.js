const express = require('express');
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


// parse requests of content-type - application/json

app.use(express.json());

// parse requests of content-type - application/json

app.use(express.json());

// parse requests of content type application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: true }));


const db = require('./app/models');
db.sequelize.sync().
    then(() => {
        console.log("DB connection is successfull");
    }).catch(err => console.log("Error:", err));


// test route

app.get("/", (req, res) => {
    res.json({ message: "Hello Kandy" });
});

// set port, listen to requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});