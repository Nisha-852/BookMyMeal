const mongoose = require("mongoose");

let connectionString = process.env.MONGO_URL + '/' + process.env.MONGO_DATABASE;
console.log(connectionString)

mongoose
    .connect(connectionString, {
        connectTimeoutMS: 30000,
        socketTimeoutMS: 45000,
    })
    .then(() => {
        console.log("CONNECTION TO THE DATABASE SUCCESSFUL: " + connectionString);
    })
    .catch((err) => {
        console.log("ERROR WHILE CONNECTING TO DATABASE: " + err);
    });