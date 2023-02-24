const Repository = require('../repositories/books')
const repositoryBooks = new Repository();

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


    async updateAvaibleBook(res, req) {
        try {

            const book = req.body;
            return await repositoryBooks.updateAvaibleBook(book);
        } catch (error) {
            console.error(error);
            res.status(500).send({ code: 500, error: "Something goes wrong" })
        }
    }

    async getMyBooks() {

        try {

            return await repositoryBooks.getMyBooks();

        } catch (error) {
            console.error(error);
            res.status(500).send({ code: 500, error: "Something goes wrong" })
        }

    }

}

module.exports = BooksController;