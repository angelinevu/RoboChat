const express = require("express");
const app = express();
app.set("view engine", "jsx")

const port = 3000;

app.get("/", (req, res) => {                    // Login
    res.sendFile(__dirname + "/frontend/login.html");
});

app.get("/chat", (req, res) => {                // Chat pages
    res.sendFile(__dirname + "/frontend/chat.html")
});

app.get("*", (req, res) => {                    // Invalid
    res.status(404).send(__dirname + "/frontend/404.html");
});

app.listen(port, "0.0.0.0", () => {             // Local host
    console.log("Server running at https://localhost:3000/");
});