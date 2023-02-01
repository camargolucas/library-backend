const BooksModel = require('../models/books')


class BooksRepository{
    constructor(){}


    async getBooks(){
        const books = await BooksModel.find({});
        console.log('books', books)
        return books
    }


}


module.exports = BooksRepository;