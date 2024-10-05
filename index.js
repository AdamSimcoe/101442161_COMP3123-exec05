const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const router = express.Router();

// Section 1A - Creating an Express.js Route for Home Page
router.get('/home', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

// Section 2A - Serving JSON Data from a User File
router.get('/profile', (req, res) => {
  const userDataFilePath = path.join(__dirname, 'user.json');

  fs.readFile(userDataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send("Server Error")
    }
    
    res.json(JSON.parse(data));
  });
});

// Section 3A - Implementing User Authentication
app.use(express.json());

router.post('/login', (req, res) => {
  const userDataFilePath = path.join(__dirname, 'user.json');

  fs.readFile(userDataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send("Server Error")
    }

    const userData = JSON.parse(data);
    const { username, password } = req.body;

    if (username !== userData.username) {
      return res.status(401).json({
        status: false,
        message: "User Name is invalid"
      });
    }

    if (password !== userData.password) {
      return res.status(401).json({
        status: false,
        message: "Password is invalid"
      });
    }

    return res.json({
      status: true,
      message: "User is valid"
    });
  });
});

// Section 4A - Creating a logout route
router.get('/logout/:username', (req, res) => {
  const username = req.params.username;
  res.send(`<b>${username} successfully logout.</b>`);
});

// Section 5A - Add error handling middleware
app.use((err,req,res,next) => {
  res.status(500).send("Server Error");
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));