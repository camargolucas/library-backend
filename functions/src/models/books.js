
const mongoose = require('mongoose');
const booksSchema = require('../schemas/books')

module.exports = mongoose.model('Books', booksSchema.schema);

