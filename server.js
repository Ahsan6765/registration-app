const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

// app.post('/register', async (req, res) => {
//     const { name, email, phone } = req.body;

//     try {
//         await sql.connect(dbConfig);
//         await sql.query`INSERT INTO Users (Name, Email, Phone) VALUES (${name}, ${email}, ${phone})`;
//         res.send('Registration Successful!');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error saving data');
//     }
// });




app.post('/register', async (req, res) => {
    const { name, email, phone } = req.body;

    try {
        await sql.connect(dbConfig);
        await sql.query`INSERT INTO Users (Name, Email, Phone) VALUES (${name}, ${email}, ${phone})`;
        
        // ✅ Success - Redirect back with status=success
        res.redirect('/?status=success');
        
    } catch (err) {
        console.error(err);
        
        // ❌ Error - Redirect back with status=error
        res.redirect('/?status=error');
    }
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
