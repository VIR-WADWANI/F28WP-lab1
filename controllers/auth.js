const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

const mysql = require("mysql");


const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

exports.register = (req,res) => {
    console.log(req.body);


    const {name, email, password, passwordConfirm} = req.body;
    
    db.query("SELECT email FROM users WHERE email = ?", [email], async (error, result) =>{
        if (error) {
            console.log(error);
        } 
        if (result.length > 0) {
            return res.render("register"), {
                message: "This email already exists"
            }
        } else if (password !== passwordConfirm) {
            return res.render("register", {
                message: "Passwords do not match"
            })
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query("INSERT INTO users SET ? ", {name: name, email: email, password: hashedPassword}, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render("register", {
                    message: "user registered"
                })
            }
        })

    })
}

exports.login = (req,res) => {
    console.log(req.body);
    const {email,password} = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log(result);
        if (result.length == 0){
            return res.render('login', {
                message: 'Invalid email or password'
            }
        )};
        const user = result[0];
        bcrypt.compare(password,user.password, (error, bcryptres) => {
            if (error){
                console.log(err);
            }
            if (bcryptres){
                return res.render('profile'), {
                    message : 'login successful'
                }
            } else {
                return res.render('login', {
                    message: 'Invalid email or password'
                }
            )};
        });

    });
}