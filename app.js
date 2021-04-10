const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require("body-parser"); // till now we haven't used it.
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
const port = 8000;

// DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
    about: String
  });
const Contact = mongoose.model('Contact', contactSchema);




//EXPRESS STATIC STUFF
app.use('/static',express.static('static'));  //For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine','pug'); // Set the template engine as pug
app.set('views',path.join(__dirname,'views')); // Set the views directory


// ENDPOINTS
app.get('/',(req,res) => {
    const params = {};
    res.status(200).render('home.pug',params);
});

app.get('/contact',(req,res) => {
    const params = {};
    res.status(200).render('contact.pug',params);
});
 
app.post('/contact',(req,res) => {
    let myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database.");
    }).catch(()=>{
        res.status(400).send("Item was not been saved to the database.")
    })     
    
});

// START THE SERVER
app.listen(port,() => {
    console.log(`The application start successfully on port ${port}`);
})
