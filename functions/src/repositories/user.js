
const UserModel = require('../models/user');

class UserRepository {


    async findUser(cpf) {
        return await UserModel.findOne({cpf: cpf});
        
    }

    async insertUser(user){
        return await UserModel.insertMany(user);
    }

}

module.exports = UserRepository;