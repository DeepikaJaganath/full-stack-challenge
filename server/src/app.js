const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
let mongoose = require('mongoose');

//Express configuration
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.listen(process.env.PORT || 8081)

//Mongoose configuration
mongoose.connect('mongodb://localhost:27017/project');
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
    console.log("Connection Succeeded");
});

//Routes
const apiRoutes = {
    user    :  require('./routes/user'),
    verify  :  require('./routes/verify')
}

app.post('/register' , apiRoutes.user.registerUser);
app.get('/verify/:token', apiRoutes.verify.verifyUser);
app.post('/login', apiRoutes.verify.isAuthenticated,  apiRoutes.user.login);