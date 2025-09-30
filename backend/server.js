const express = require ('express');    // Import Express framework
const cors = require('cors');           // Import CORS middleware
const mysql = require('mysql');         // Import MySQL library

const app = express();                  // Create an Express application


const corsOptions = {    // Define CORS options
    origin: [
        'http://localhost:8889', 
        'http://localhost:3000' 
    ],
    optionsSuccessStatus: 200 ,                      // Set success status for OPTIONS requests
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",       // Allowed HTTP methods
    headers: 'Content-type,Authorization',          // Allowed headers 
    credentials: true,                              // allow cookies to be sent with requests
};

const database = mysql.createConnection({           // Create a MySQL connection
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crudnode'
})


app.get("/", (req,res)=>{                           // Define a GET route for the root path
    //res.json("Hello this is the backend");        // Send a JSON response
    const sql = "SELECT * FROM student ";            // SQL query to select all users
    database.query(sql, (err, data) => {            // Execute the SQL query
        if(err) return res.json("Error");           // Handle errors
        return res.json(data);                      // Send the query result as a JSON response
    })
})








app.listen(8081, () => {                // Start the server on port 8081
    console.log('Server is running on http://localhost:8081');
})