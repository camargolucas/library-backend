const UserRepository = require('../repositories/user')
const userRepository = new UserRepository()

class UserController {


    async createUser(req, res){
        const user = req.body;        
        return userRepository.insertUser(user);
    }
}


module.exports = UserController;