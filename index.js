//Initialize express and app
const express = require('express');
const app = express();
// Initialize Mongo Client
const MongoClient = require("mongodb").MongoClient;
// Initialize chalk for console decoration and shit...
const chalk = require('chalk');

// Initializing Dotenv
const dotenv = require('dotenv');

dotenv.config();

// Setting up middleware 
app.use(express.json());            //json for databases like mongo and shit
app.use(express.urlencoded({ extended: true }));       //urlencoded for websites and shit


const client = new MongoClient(process.env.MONGO_URI, {
    useUnifiedTopology: true,
});

let collection;
// to verify connection with the database
const testfunc = async () => {
    try {
        await client.connect();
        console.log(chalk.bold.green("****************DATABASE CONNECTED"));
        collection = client.db().collection("test");
    }
    catch (err) {
        console.log(err);
        process.exit(-1);
    }
}

//Shows all the data                                                                    // Works
app.get('/api/', async (req, res) => {
    let data = await collection.find({}).toArray();
    res.json(data);
})

// // to show one particular json object at a time according to the ID req
// app.get('/api/', async (req, res) => {                                     // Bug Fix it
//     let datain = req.body;
//     let f = datain._id;
//     let data = await collection.findOne({ _id: f });
//     res.json(data);
// })

// To add a new json file to the MongoDB                                                // Works
app.post('/api/', async (req, res) => {
    let data = req.body;
    await collection.insertOne(data);
    res.send("Your Data has been saved");
})


// // to edit existing files                                            // Bug Fix it
// app.put('/api/', async (req, res) => {
//     let internal = req.body;
//     let dat = internal._id;
//     let data = await collection.findOne({ _id: dat });
//     data.name = internal.name;
//     await collection.replaceOne(data);
//     res.send("Replaced Succesfully")
// })

// To delete a json file, depending on the ID received                  // Pending



// connecting to web-port
let port = process.env.PORT || 3000;
testfunc().then(() => {
    app.listen(port, () => {
        console.log(chalk.bold.green(`*********************Listening on port ${port}`));
    });
});