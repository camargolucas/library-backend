const functions = require("firebase-functions");
const express = require('express');
const app = express();
const port = 1000;
const connectMongo = require('./src/helpers/connectMongo')
const BooksController = require('./src/controller/books')
const booksController = new BooksController();
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression')
const corsOptions = {
    credentials:true,
    origin: ['https://library-app-user.web.app', 'http://localhost:4222']
}

connectMongo.init();

app.use([cors(corsOptions), helmet(), compression()]);

app.get('/books', async (req, res) => {       
    const books = await booksController.getBooks(res, req)
    res.status(200)
        .send(books)
})

app.get('/livenezz', async (req, res) => {          
    res.status(200)
        .send('Backend is up')
})



/* app.listen(5000, () =>{
    console.log('listen at', 5000)
}) */

// // https://firebase.google.com/docs/functions/get-started
//
 

exports.server = functions.https.onRequest(app);



