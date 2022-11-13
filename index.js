// importing the dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


// defining the Express app
const app = express();
// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
//app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var abc = "\\I am a slash";
    //var sq = 'MARS\\MARS:1433';
    var sq = '127.0.0.1:1433';
    var config = {
        user: 'mars',
        password: 'mars',
        server: sq ,  
        //server: 'localhost', 
        database: 'HRMS',
        port:1433 
    };
    console.log(abc);
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('use HRMS;select * from Student', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});