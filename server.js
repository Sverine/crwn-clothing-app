//This way to call library from modules is belonging to node
//Instead of classic 'import xxx from 'xxx'' in React
const express = require('express');
const bodyParser = require('body-parser');
//Allow to dynamicly build the path when we call it to where we want to go
const path = require ('path');

if (process.env.NODE_ENV !== "production") require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

//By using the body parser middleware, it's allow us to avoid whrite .json() after all fetch call
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname, 'client/build')))
    //The get request is what we've got from the front-end when the client hit this route
    app.get('*',function(req,res){
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.listen(port,error=>{
    if(error) throw error;
    console.log('Server running on port ' + port);
})

app.post('/payment', (req,res)=>{
    const body ={
        source:req.body.token.id,
        amount:req.body.amount,
        currency:'usd'
    };

    stripe.charges.create(body,(stripeErr, stripeRes)=>{
        if(stripeErr){
            res.status(500).send({error:stripeErr})
        }else{
            res.status(200).send({success:stripeRes})
        }
    })

})



