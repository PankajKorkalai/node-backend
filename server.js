const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');


const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;

// middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();   // Move to the next phase
}

app.use(logRequest);     // pure pe laga diya

// if we want to just add in one get or post then
// app.get('/', logRequest, function(req, res){
//     res.send('Welcome to my hotel...How can i help you ?')
// })


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session: false});

app.get('/', function(req, res){
    res.send('Welcome to my hotel, How can i help you ?')
})



//Import routes files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const Person = require('./models/Person');

// Use the routers
app.use('/person',localAuthMiddleware, personRoutes);
app.use('/menu', localAuthMiddleware, menuItemRoutes);



app.listen(PORT, () =>{
    console.log('listening on port 3000');
})