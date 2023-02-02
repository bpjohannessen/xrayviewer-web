const fs = require('fs');
const path = require('path');
const directory = './src/ortho';

var parser = require('tree-parser');

var tree = parser(directory);

const express = require("express");

const app = express();

app.get("/api", (req, res) => {
    //return res.send("Received get method");
    return res.send(tree);
})

app.use(express.static(__dirname));
//app.use(express.static(__dirname + '/src'));
app.use('/static', express.static(path.join(__dirname, 'src/ortho')))
console.log(path.join(__dirname, 'src/ortho'));
app.use("*", (req, res) => {
    res.send("404");
});




app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
    console.log("kuk: " + __dirname);
  });

app.listen(3000, () =>
  console.log(`Example app listening on port 3000!`),
  //console.log(tree)
);

//console.log(tree);