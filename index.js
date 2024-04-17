const express = require("express");
const app = express();
app.set("view engine", "jsx")

const port = 3000;

app.get("/", (req, res) => {                    // Home Page
    res.sendFile(__dirname + "/index.html");
});

app.get("/home", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("*", (req, res) => {                    // Invalid
    res.status(404).send("404 - Not Found");
});

app.listen(port, "0.0.0.0", () => {             // Local host
    console.log("Server running at https://localhost:3000/");
});