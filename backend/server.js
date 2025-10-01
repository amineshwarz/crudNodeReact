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

app.use(cors(corsOptions))

app.use(express.json())                  // Middleware to parse JSON request bodies
// app.use(cors())                     // Enable CORS for all routes


const database = mysql.createConnection({           // Create a MySQL connection
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crudnode',
    port: 8889
})

// ------------------- Route pour récupérer tous les utilisateurs -------------------

app.get("/", (req,res)=>{                           // Define a GET route for the root path
    //res.json("Hello this is the backend");        // Send a JSON response
    const sql = "SELECT * FROM student ";            // SQL query to select all users
    database.query(sql, (err, data) => {            // Execute the SQL query
        if(err) { 
            console.error('Erreur MySQL:', err);  // Log any errors to the console
            return res.status(500).json({ message: "Erreur SQL", error: err }); // Renvoie le détail au client      
        }
        return res.json(data);            // Send the query result as a JSON response
    })
})
// ------------------- Route pour créer un nouvel utilisateur -------------------

app.post("/create", (req,res)=>{                     // Define a POST route for creating a new user
    const sql = "INSERT INTO student (`name`, `email`) VALUES (?)"; // SQL query to insert a new user
    const values = [                                 // Values to be inserted
        req.body.name,
        req.body.email
    ];
    database.query(sql, [values], (err, data) => {  // Execute the SQL query
        if(err) { 
            console.error('Erreur MySQL:', err);  // Log any errors to the console
            return res.status(500).json({ message: "Erreur SQL", error: err }); // Renvoie le détail au client      
        }
        return res.json(data);           // Send a success message as a JSON response
    })
})
// ------------------- Route pour mettre à jour un utilisateur -------------------

app.put("/update/:id", (req,res)=>{                  // Define a PUT route for updating a user
    const sql = "UPDATE student SET `name` = ?, `email` = ? WHERE id = ?"; // SQL query to update a user
    const values = [                                 // New values for the user
        req.body.name,
        req.body.email
    ];
    const id = req.params.id;                        // ID of the user to be updated
    database.query(sql, [...values, req.params.id], (err, data) => { // Execute the SQL query
        if(err) { 
            console.error('Erreur MySQL:', err);  // Log any errors to the console
            return res.status(500).json({ message: "Erreur SQL", error: err }); // Renvoie le détail au client      
        }
        return res.json(data);           // Send a success message as a JSON response
    })
})


// ------------------- Route pour récupérer un étudiant par son ID -------------------
app.get('/student/:id', (req, res) => {
    const studentId = req.params.id;
    const sql = "SELECT * FROM student WHERE id = ?";
  
    database.query(sql, [studentId], (err, results) => {
      if (err) {
        console.error('Erreur SQL:', err);
        return res.status(500).json({ message: "Erreur serveur" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Étudiant non trouvé" });
      }
      res.json(results[0]);
    });
  });

// ------------------- Route pour supprimer un utilisateur -------------------

app.delete("/student/:id", (req,res)=>{               // Define a DELETE route for deleting a user
    const sql = "DELETE FROM student WHERE id = ?";   // SQL query to delete a user
    const id = req.params.id;                        // ID of the user to be deleted
    database.query(sql, [id], (err, data) => {      // Execute the SQL query
        if(err) { 
            console.error('Erreur MySQL:', err);  // Log any errors to the console
            return res.status(500).json({ message: "Erreur SQL", error: err }); // Renvoie le détail au client      
        }
        return res.json(data);           // Send a success message as a JSON response
    })
})




app.listen(8081, () => {                // Start the server on port 8081
    console.log('Server is running on http://localhost:8081');
})