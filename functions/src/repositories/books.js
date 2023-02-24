const BooksModel = require('../models/books')
const mongoose = require('mongoose');

class BooksRepository {
    constructor() { }


    async getBooks() {
        const books = await BooksModel.find({});
        console.log('books', books)
        return books
    }

    async updateAvaibleBook(book) {
        return await BooksModel.updateOne(
            { "_id": mongoose.Types.ObjectId(book._id) },
            {
                $set: {
                    avaible: !book.avaible
                }
            });
    }

    async getMyBooks() {
        return await BooksModel.find({ avaible: false})
    }


}


module.exports = BooksRepository;