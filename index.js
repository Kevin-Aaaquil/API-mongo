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
        console.log(chalk.bold.blue("****************DATABASE CONNECTED"));
        collection = client.db().collection("test");
    }
    catch (err) {
        console.log(err);
        process.exit(-1);
    }
}

//Shows all the data                                               // GET                    // Works
app.get('/api/', async (req, res) => {
    try {
        let data = await collection.find({}).toArray();
        res.send(data);
    } catch (error) {
        console.log(error.message);
    }
});


// To add a new json file to the MongoDB                          // POST                      // Works
app.post('/api/', async (req, res) => {
    try {
        let data = req.body;
        await collection.insertOne(data);
        res.send("Your Data has been saved");
    } catch (error) {
        console.log(error.message);
    }
});


// To edit an existing file                                      //PUT                         //Pending
app.put('/api/:id', async (req, res) => {
    try {
        res.send("PUT");
    } catch (error) {
        console.log(error.message);
    }
});


// To delete a json file, depending on the ID received           //DELETE                       // Works
app.delete('/api/:id', async (req, res) => {
    try {
        //res.send("DELETE");
        // console.log(req.params.id);        
        collection.deleteOne({ name: req.params.id }, (err, obj) => {
            if (err) throw err;
            console.log("Document Deleted");
            res.send("Document Deleted")
        });
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
});


// To show a particular json body 
app.get('/api/:id', async (req, res) => {
    try {
        res.send("SPECIFIC GET");
    } catch (error) {
        console.log(error.message);
    }
});


// connecting to web-port
let port = process.env.PORT || 3000;
testfunc().then(() => {
    app.listen(port, () => {
        console.log(chalk.bold.blue(`*********************Listening on port ${port}`));
    });
});