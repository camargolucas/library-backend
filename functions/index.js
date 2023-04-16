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

const UserRepository = require('./src/repositories/user')
const userRepository = new UserRepository()

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
    const user = await booksController.updateAvaibleBook(res, req);
    user.cpf = null;
    res.status(200)
        .send(user);
})

app.put('/books/devolutionBook', async (req, res) => {
    const user = await booksController.devolutionBook(res, req);
    user.cpf = null;
    res.status(200)
        .send(user);
})


app.get('/books/myBooks', async (req, res) => {
    const book = await booksController.getMyBooks(req, res);
    res.status(200)
        .send(book);
})

app.post('/login', async (req, res) => {
    const user = await loginController.login(req, res);
    if (!!user) {
        user.cpf = null;
        console.log("user CPF", user.cpf);
        res.status(200)
            .send({ success: true, user: user });
    } else {
        res.status(200)
            .send({ success: false, error: 'Usuario não encontrado!' })
    }

})

app.post('/user', async (req, res) => {

    const body = req?.body;
    const alreadyExist = await userRepository.findUser(body?.cpf);
    if (alreadyExist) {
        res.status(200)
            .send({ success: false, error: 'Usuario ja existe!' })
    } else {
        const user = await userController.createUser(req, res);
        res.status(200)
            .send({ success: true, user: user });
    }

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



