const { Schema } = require("mongoose");

let userSchema = new Schema({
    name: String,
    cpf: String,
    books: {
        type: Array, default: []
    },
},
    {
        timestamps: true,
        collection: 'user'
    })

userSchema.index({ "name": 1, "cpf": 1 });


module.exports.schema = userSchema;