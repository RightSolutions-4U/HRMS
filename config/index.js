/*const config = {
    user: 'mars',
    password: 'mars',
    server: 'localhost', 
    database: 'HRMS', 
    //dbUrl: process.env.DBURL || "mongodb://localhost/test-db",
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
    logDir: process.env.LOGDIR || "logs",
    //viewEngine: process.env.VIEW_ENGINE || "html"
  };*/
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
  module.exports = config;