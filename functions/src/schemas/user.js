const { Schema } = require("mongoose");
const { bcrypt } = require('bcrypt');


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
userSchema.pre('save', function (next) {
    if (!this.isModified('cpf')) return next();
    
    bcrypt.hash(this.cpf, 10, (err, passwordHash) => {
        if (err) return next(err);
        this.password = passwordHash;
        next();
    })
})

userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return cb(err);
        else {
            if (!isMatch) return cb(null, isMatch);
            return cb(null, this);
        }
    })
}


module.exports.schema = userSchema;