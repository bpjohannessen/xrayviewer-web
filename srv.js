/*
 * Server for xrayviewer-web
 */
// Directories for different courses
const dir_ortho = "./src/ortho";
const dir_pedsurg = "./src/pedsurg";
const dir_thorax = "./src/thorax";

// Required packages
const fs = require("fs");
const path = require("path");
const cors = require("cors");
var parser = require("tree-parser");

var tree_ortho = parser(dir_ortho, "_desc");
var tree_pedsurg = parser(dir_pedsurg, "_desc");
var tree_thorax = parser(dir_thorax, "_desc");

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
    return res.send("Pick one: /api/ortho, /api/pedsurg, /api/thorax");
});

app.get("/api/ortho", (req, res) => {
    return res.send(tree_ortho)
});

app.get("/api/pedsurg", (req, res) => {
    return res.send(tree_pedsurg);
});

app.get("/api/thorax", (req, res) => {
    return res.send(tree_thorax);
})

// Serves the loading
app.get("/", function(req, res) {
  console.log("landing.html");
  res.sendFile("/Users/bp/code/xrayviewer-web/landing.html");
});

app.use(express.static(__dirname));



// Serves the index.html
app.get("/:course", function(req, res) {
    console.log(req.params.course);
    //res.sendFile(path.join(__dirname, "/index.html"));
    res.redirect("index.html?course="+req.params.course);
});

// Returns 404 if any other file
app.use("*", (req, res) => {
  res.send("404");
  console.log("404");
});

// Starts the server on api_port
app.listen(api_port, () =>
  console.log(`Xrayviewer-web listening on port ${api_port}!`),
);