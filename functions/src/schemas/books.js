const mongoose = require('mongoose');
const { Schema } = mongoose;


let booksSchema = new Schema({
    name: { type: String },
    author: { type: String },
    theme: String,
    frontImage: String,
    pages: Number,
    editor: String,
    avaible: Boolean,
    owner: String,

}, {
    timestamps: true,
    collection: 'books'
})

booksSchema.index({ "name": 1 })



module.exports.schema = booksSchema;