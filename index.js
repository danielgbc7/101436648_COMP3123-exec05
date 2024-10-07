const express = require('express');
const app = express();
const fs = require('fs'); // Required for reading the user.json file

app.use(express.json()); // Add middleware to parse JSON in request bodies

// Define the /login POST route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Read user.json file
  fs.readFile('user.json', (err, data) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error'
      });
    }

    const user = JSON.parse(data);

    // Validate username
    if (username !== user.username) {
      return res.json({
        status: false,
        message: 'User Name is invalid'
      });
    }

    // Validate password
    if (password !== user.password) {
      return res.json({
        status: false,
        message: 'Password is invalid'
      });
    }

    // If username and password are valid
    res.json({
      status: true,
      message: 'User Is valid'
    });
  });
});

// Set up the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
