const Repository = require('../repositories/books')
const repositoryBooks = new Repository();
const BooksModel = require('../models/books');
const mongoose = require('mongoose');
class BooksController {
    constructor() {

    }

    validateFields(fields, params) {
        const arrParams = Object.keys(params);
        const missedFields = []

        fields.forEach(field => {
            if (!arrParams.includes(field)) missedFields.push(field);
        });

        return missedFields;

    }

    async getBooks(res, req) {
        try {
            const missingFields = this.validateFields(['page', 'limit'], req.query);

            if (missingFields.length > 0) {
                res.status(400).send({ code: 400, error: `Missing fields: ${missingFields}` })
                return
            }

            const { page, limit } = req.query;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const books = await repositoryBooks.getBooks();

            return books.slice(startIndex, endIndex);

        } catch (error) {
            console.error(error);
            res.status(500).send({ code: 500, error: "Something goes wrong" })
        }
    }

    async devolutionBook(res, req) {
        try {

            const body = req.body;
            const user = body.user;
            const book = body.book;                 
            
            return await repositoryBooks.devolutionBook(book, user);
        } catch (error) {
            console.error(error);
            res.status(500).send({ code: 500, error: "Something goes wrong" })
        }
    }


    async updateAvaibleBook(res, req) {
        try {

            const body = req.body;
            const user = body.user;
            const book = body.book;            

            const avaibleBook = await BooksModel.findOne({ "_id": mongoose.Types.ObjectId(book._id) })

            if(!avaibleBook?.avaible){
                res.status(200).send({ code: 200, error: `Livro já emprestado! ${user.name}` })
                return;
            }

            return await repositoryBooks.updateAvaibleBook(book, user);
        } catch (error) {
            console.error(error);
            res.status(500).send({ code: 500, error: "Something goes wrong" })
        }
    }

    async getMyBooks(req, res) {               
        try {

            const user = req.query._id           
            return await repositoryBooks.getMyBooks(user);

        } catch (error) {
            console.error(error);
            res.status(500).send({ code: 500, error: "Something goes wrong" })
        }

    }

}

module.exports = BooksController;