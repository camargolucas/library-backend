
const UserRepository = require('../repositories/user')
const userRepository = new UserRepository();


class LoginController {

    async login(req, res) {
        try {
            const body = req.body;
            return await userRepository.findUser(body?.cpf);
        } catch (error) {
            res.status(500).send({success:false, error: 'Something goes wrong!'})
        }

    }

}


module.exports = LoginController;