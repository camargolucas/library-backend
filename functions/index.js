const functions = require("firebase-functions");
const express = require('express');
const app = express();
const port = 1000;
const connectMongo = require('./src/helpers/connectMongo')
const BooksController = require('./src/controller/books')
const booksController = new BooksController();

const LoginController = require('./src/controller/login')
const loginController = new LoginController();

const UserController = require('./src/controller/user')
const userController = new UserController();

const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression')
const corsOptions = {
    credentials: true,
    origin: ['https://library-app-user.web.app', 'http://localhost:4222']
}

connectMongo.init();

app.use([cors(corsOptions), helmet(), compression()]);

app.get('/books', async (req, res) => {
    const books = await booksController.getBooks(res, req);
    res.status(200)
        .send(books)
})

app.put('/books/updateAvaibleBook', async (req, res) => {
    const book = await booksController.updateAvaibleBook(res, req);
    res.status(200)
        .send(book);
})


app.get('/books/myBooks', async (req, res) => {
    const book = await booksController.getMyBooks();
    res.status(200)
        .send(book);
})

app.post('/login', async (req, res) => {
    const user = await loginController.login(req, res);
    if (!!user)
        res.status(200)
            .send(user);
    else
        res.status(404)
            .send({ error: 'User not found.' })
})

app.post('/user', async (req, res) => {
    const user = await userController.createUser(req, res);

    res.status(200)
        .send(user);


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



