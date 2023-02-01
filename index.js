const express = require('express');
const app = express();
const port = 1000;
const connectMongo = require('./functions/src/helpers/connectMongo')
const BooksController = require('./functions/src/controller/books')
const booksController = new BooksController();

connectMongo.init();

app.get('/', async (req, res) => {
    const books = await booksController.getBooks();
    res.status(200)
        .send(books)
})

app.listen(port, () => {
    console.log(`${port}`)
})
