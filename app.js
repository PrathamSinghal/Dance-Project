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
 
// schema mei banane ke baad or model mei compile karne ke baad mai ek post request karne ke liye method likhunga
// isme mai kahunga ki agar post request aati hai tab saare ke saare post parameters lena hai or ek database mei save karna hai.
// agar express ki maddad se post karna chahate hai .....post request maarkar database mei sav karna chahate hai to hame ek module install karna padega ....bodyParser 
app.post('/contact',(req,res) => {
    // yha mai kahunga ki jaise hi contact pe koi post request marega...tab ye hona chaaiye.
    let myData = new Contact(req.body); // ek naya contact object banaunga...kisse...req.body se jo request aa rahi hai usme se content abstract karke ek object bna lo.
    // ab mai save karunga
    myData.save().then(()=>{
        res.send("This item has been saved to the database.");
    }).catch(()=>{
        res.status(400).send("Item was not been saved to the database.")
    })         // ye save karne ke saath-saath ek promise return karega....or vo promise return karega to mujhe likhna padega .then()  usko handle karne ke liye kyuki node mei saari cheezein asynchronous hoti hai
    
    // res.status(200).render('contact.pug'); // ye error isliye aa rha tha kyuki maine isko ek baar send kar diya tha but mai vaapas se isko send karne ki koshish kar rha tha.
});

// START THE SERVER
app.listen(port,() => {
    console.log(`The application start successfully on port ${port}`);
})
