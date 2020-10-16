//Import the express package in to the server
const express = require('express')
//Name the server appplication as crudApp
const crudApp = express();
//Importing the body-parser
const bodyParser = require('body-parser')
// Make sure you place body-parser before your CRUD handlers!
crudApp.use(bodyParser.urlencoded({ extended: true }))
//Authenticate the mongodb cloud account - database
const MongoClient = require('mongodb').MongoClient
connectionString = 'mongodb+srv://sanj:sanj@cluster0.xbfdd.mongodb.net/<dbname>?retryWrites=true&w=majority'
crudApp.set('view engine', 'ejs')
crudApp.use(express.static('public'))
crudApp.use(bodyParser.json())
//ESTABLISHING DB CONNECTION
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('assignment-3')
    const quotesCollection = db.collection('quotes')
    //POST CALL TO UPDATE THE QUOTES 
    //CREATE OPERATION
    crudApp.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body) //insertOne is the method to add data to collection
       .then(result => {
          res.redirect('/')
       })
       .catch(error => console.error(error))
   });
   //READ OPERATION
   crudApp.get('/getData',(req,res)=>{
      const cursor = db.collection('quotes').find().toArray()
      .then(results => {
        console.log(results);
       res.render('index.ejs',{quotesView:results});
      })
      .catch(error => console.error(error))
   });
   //UPDATE OPERATION
    crudApp.put('/updateQuotes',(req,res)=>{
      console.log(req.body);
      quotesCollection.findOneAndUpdate( { name: 'Ross' },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote
        }
      },
      {
        upsert: true
      })

      quotesCollection.findOneAndUpdate( { name: 'Rachel' },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote
        }
      },
      {
        upsert: true
      })
      .then(result => {
       res.json('success')
      })
      .catch(error => console.error(error))
    });

    //DELETE OPERATION
    crudApp.delete('/deleteQuotes',(req,res)=>{
      console.log(req.body);
      quotesCollection.findOneAndDelete( { quote: 'Practice makes us perfect' },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote
        }
      })
      .then(result => {
       res.json('success')
      })
      .catch(error => console.error(error))
    });
  })
  .catch(error => console.error(error))
crudApp.get('/', (req, res) => {
   res.sendFile(__dirname+'/index.html')
});
crudApp.listen(3000, function() {
  console.log('the server is listening on 3000')
});