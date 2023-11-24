const express = require('express');
const mysql = require("mysql");
const app = express();
const port = 3000;
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({path: "nodejs/data.env"})

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

app.use(express.static('public'));
app.use(express.static('controllers'));

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MySQL connected...");
    }
});

const publicDirectory = path.join(__dirname, "/public");
app.use(express.static(publicDirectory));
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", require("../routes/pages"))
app.use("/auth", require("../routes/auth"));

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
}); 