/*
 * Server for xrayviewer-web
 */

// Directories for different courses
const directory = "./src/ortho";

// Required packages
const fs = require("fs");
const path = require("path");
const cors = require("cors");
var parser = require("tree-parser");
var tree = parser(directory, "_desc");
const express = require("express");
const app = express();

// Imports the config and port which the server is listening on
const config = require("config");
const api_port = config.get("server.port");

console.log("Running with config:");
console.log(config);
console.log("\n");

// Cors config
app.use(cors());
app.options("*", cors());


// Returns information about all images in json format
app.get("/api", (req, res) => {
    return res.send(tree);
})

app.use(express.static(__dirname));

// Serves the index.html
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

// Returns 404 if any other file
app.use("*", (req, res) => {
  res.send("404");
});

// Starts the server on api_port
app.listen(api_port, () =>
  console.log(`Xrayviewer-web listening on port ${api_port}!`),
);