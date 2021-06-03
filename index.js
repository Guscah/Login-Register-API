const express = require('express');
const app = express();
const database = require("./manager/database");
const user = require("./routes/users");

const con = new database ({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
})

global.db = con;

app.use(express.json());
app.use("/api/user", user);
app.listen(3000, () => console.log("Listen on Port 3000"));