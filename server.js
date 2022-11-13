// importing the dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const Org = require('./routes/Org');


// defining the Express app
const app = express();
app.use("/Org", Org);
// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
//app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.get('/', function (req, res) {
    var Connection = require('tedious').Connection;  
    var config = {  
        server: 'MARS',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'mars', //update me
                password: 'mars'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: false,
            database: 'HRMS'  //update me
        }
    }; 
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.  
        console.log("Connected");  
        executeStatement();  
    });  
    
    connection.connect();
  
    var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES;  
  
    function executeStatement() {  
        request = new Request("SELECT * from Organization;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        var result = "";  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result+= column.value + " ";  
              }  
            });  
            console.log(result);  
            result ="";  
        });  
  
        request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
        });  
        
        // Close the connection after the final event emitted by the request, after the callback passes
        request.on("requestCompleted", function (rowCount, more) {
            connection.close();
        });
        connection.execSql(request);  
    }
});


// starting the server
app.listen(3002, () => {
    console.log('listening on port 3002');
  });