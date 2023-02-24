
const UserRepository = require('../repositories/user')
const userRepository = new UserRepository();


class LoginController {

    async login(req, res) {
        const body = req.body;
        return await userRepository.findUser(body?.cpf);      


    }

}


module.exports = LoginController;