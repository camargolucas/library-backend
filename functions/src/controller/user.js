const UserRepository = require('../repositories/user')
const userRepository = new UserRepository()

class UserController {


    async createUser(req, res) {
        const user = req?.body;
        try {
            return userRepository.insertUser(user);

        } catch (error) {
            console.error(error);
        }
    }
}


module.exports = UserController;