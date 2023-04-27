//imports
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const app = express()
const port = 8080
passportLocalMongoose = require("passport-local-mongoose")

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


//mongo time
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://test:borko@cluster0.zrzyyhw.mongodb.net/test";

const userSchema = {
    username: String,
    password: String,
}


const JWT_SECRET = 'bangmyheadonthekeyboard@#@%!1243523efdgfhhsteagnkaerh'

mongoose.connect('mongodb://127.0.0.1:27017/mydb')

app.use(bodyParser.json())

//for checking if databases work:
//const uri = "mongodb://127.0.0.1:27017";


var options = {
    index: "index.ejs"
  };


app.get('/api', function(req, res){
    res.send("Yes we have an API now")
})

// e.g. test using:
//http://127.0.0.1:8000/api/getPrice?salary=2000&days=20

//////////////////////////////////
//this is for register, login and change password

//if this is leaked, all of my json payloads can be manipulated

app.post('/api/change-password', async (req, res) => {
	const { token, newpassword: plainTextPassword } = req.body
	//give errors to users if they do the wrong thing
	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	try {
		const user = jwt.verify(token, JWT_SECRET)

		const _id = user.id

		const password = await bcrypt.hash(plainTextPassword, 10)

		await User.updateOne(
			{ _id },
			{
				$set: { password }
			}
		)
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}
})


//Handling user login
app.post("/login", async function (req, res) {
    try {
        // check if the user exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            //check if password matches
            const result = req.body.password === user.password;
            if (result) {
                req.session.userId = user._id;
                res.redirect("/index");
            } else {
                res.status(400).json({ error: "password doesn't match" });
            }
        } else {
            res.status(400).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Handling user signup
app.post("/register", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.create({
        name: name,
        email: email,
        password: password
    });

    return res.redirect('/');
});

//register function
app.post('/api/register', async (req, res) => {
	const { username, password: plainTextPassword } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			username,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})






//my own stuff to actually run the page lol
app.use(express.static('views'))
app.use('/css', express.static(__dirname + 'views/css'))
app.use('/images', express.static(__dirname + 'views/images'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('/entry3.ejs'))

//Set Views
//app.set('views', './views')
app.set('views', './views')
app.set('view engine', 'ejs')

// register .html as an engine in express view system
app.engine('.html', require('ejs').renderFile)

//Handle user logout
app.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

app.get('', (req, res) => {
    //run the main page
    res.render('index')
})

app.get('/home', (req, res) => {
    //run the login.ejs page
    res.render('home')
})

app.get('/home2', (req, res) => {
    //run the thanks.ejs page
    res.render('home2')
})

app.get('/home3', (req, res) => {
    //run the thanks.ejs page
    res.render('home3')
})

app.get('/about', (req, res) => {
    //run the register.ejs page
    res.render('about')
})
//1906490
app.get('/index', (req, res) => {
    //run the index.ejs page
    res.render('index')
})

app.get('/quiz', (req, res) => {
    //run the thanks.ejs page
    res.render('quiz')
})

app.get('/quiz2', (req, res) => {
    //run the thanks.ejs page
    res.render('quiz2')
})

app.get('/quiz3', (req, res) => {
    //run the thanks.ejs page
    res.render('quiz3')
})

app.get('/final', (req, res) => {
    //run the thanks.ejs page
    res.render('final')
})

app.get('/change-password', (req, res) => {
    //run the thanks.ejs page
    res.render('change-password')
})

app.get('/login', (req, res) => {
    //run the thanks.ejs page
    res.render('login')
})

app.get('/register', (req, res) => {
    //run the thanks.ejs page
    res.render('register')
})

app.get('/tests', (req, res) => {
    //run the thanks.ejs page
    res.render('tests')
})


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

app.listen(port, () => {
    console.log('Server Started on port: ' + port);
});
