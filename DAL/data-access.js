//const mssql = require('mssql')
var Connection = require('tedious').Connection; 
const poolConfig = require('../config/index')
let pool;

/* const poolConfig = () => ({
    driver: process.env.SQL_DRIVER,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    user: process.env.SQL_UID,
    password: process.env.SQL_PWD,
    options: {
        encrypt: false,
        enableArithAbort: false
    }
});
 */
const fetchParams = entity => {
    const params = [];
    for (const key in entity) {
        if (entity.hasOwnProperty(key)) {
            const value = entity[key];
            params.push({
                name: key,
                value
            });
        }
    }
    return params;
};

const assignParams = (request, inputs, outputs) => {
    
    [inputs, outputs].forEach((params, index) => {
        const operation = index === 0 ? 'input' : 'output';
        
        params.forEach(param => {
            console.log(param.type)
            if (param.type) {
                console.log('if');
                request[operation](param.name, param.type, param.value);
            } else {
                console.log('else');
                request[operation](param.name, param.value);
            }
        });
    });
};

const run = async (name, command, inputs = [], outputs = []) => {
    //console.log(name);
    await connect();
    //console.log('after');
    const request = pool.request;
    //console.log('request' + request);
    assignParams(request, inputs, outputs);
    console.log('after');
    return request[name](command);
};

const connect = async () => {
    //console.log(pool);
    if (!pool) {
        //console.log('inside');
        pool = new Connection(poolConfig);
        pool.on('connect', function(err) {  
            // If no error, then good to proceed.  
            console.log("Connected");  
            //executeStatement();  
        });
    }
    if (!pool.connected) {
        await pool.connect();
    }
};
    

const query = async (command, inputs = [], outputs = []) => {
    return run('query', command, inputs, outputs);
};

const queryEntity = async (command, entity, outputs = []) => {
    const inputs = fetchParams(entity);
    return run('query', command, inputs, outputs);
};

const execute = async (command, inputs = [], outputs = []) => {
    return run('execute', command, inputs, outputs);
};

const executeEntity = async (command, entity, outputs = []) => {
    const inputs = fetchParams(entity);
    return run('execute', command, inputs, outputs);
};

const generateTable = (columns, entities) => {
    const table = new mssql.Table();

    columns.forEach(column => {
        if (column && typeof column === 'object' && column.name && column.type) {
            if (column.hasOwnProperty('options')) {
                table.columns.add(column.name, column.type, column.options);
            } else {
                table.columns.add(column.name, column.type);
            }
        }
    });

    entities.forEach(entity => {
        table.rows.add(...columns.map(i => entity[i.name]));
    });

    return table;
};

module.exports = {
    pool,
    //mssql,
    connect,
    query,
    queryEntity,
    execute,
    executeEntity,
    generateTable
};