
const UserModel = require('../models/user');

class UserRepository {


    async findUser(cpf) {
        return await UserModel.findOne({cpf: cpf});
        
    }

    async insertUser(user){
        return await UserModel.create(user);
    }

}

module.exports = UserRepository;