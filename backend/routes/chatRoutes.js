const express = require('express');
const router = express.Router();

// Authentication middleware, e.g., passport.js

router.get('/rooms', (req, res) => {

    // Return list of chat rooms
});

router.get('/rooms/:roomId/messages', (req, res) => {
    // Retrieve messages for a specific room
});

router.post('/rooms/:roomId/messages', (req, res) => {
    // Send a message to a specific room
});

//    app.get("/login", async(req, res) => {              //Login Page
//       res.status(200).sendFile(__dirname + "/frontend/login.html");
//  });

module.exports = router;