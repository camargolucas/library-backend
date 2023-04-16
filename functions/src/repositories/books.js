const BooksModel = require('../models/books')
const UserModel = require('../models/user')
const mongoose = require('mongoose');

class BooksRepository {
    constructor() { }


    async getBooks() {
        const books = await BooksModel.find({});
        return books
    }

    async devolutionBook(book, user) {

        await BooksModel.updateOne(
            { "_id": mongoose.Types.ObjectId(book._id) },
            {
                $set: {
                    avaible: true,
                    owner: ""
                }
            });
        return await UserModel.findOneAndUpdate(
            { "_id": mongoose.Types.ObjectId(user._id) },
            { $pull: { books: { _id: book._id } } },
            { returnDocument: 'after' }

        )
    }


    async updateAvaibleBook(book, user) {

        await BooksModel.updateOne(
            { "_id": mongoose.Types.ObjectId(book._id) },
            {
                $set: {
                    avaible: false,
                    owner: user?.name
                }
            });

        console.log('USER', user)

        console.log('BOOK', book)
        return await UserModel.findOneAndUpdate(
            { "_id": mongoose.Types.ObjectId(user._id) },
            {
                $push: {
                    books: book
                }
            },
            { returnDocument: 'after' }
        )
    }

    async getMyBooks(id) {
        const user = await UserModel.findOne({ "_id": mongoose.Types.ObjectId(id) })
        if (!!user) {
            return user.books;
        } else {
            return [];
        }

    }


}


module.exports = BooksRepository;