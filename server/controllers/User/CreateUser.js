import User from '../../models/User.js'
import bcrypt from 'bcryptjs'
import generateJWT from '../../utils/generateJWT.js'

const createUser = async (req, res) => {
    const userData = req.body

    try {
        const findUser = await User.findOne({ email: userData.email })
        if (findUser) {
            return res.status(200).json({
                ok: false,
                msg: 'The email is already used',
            })
        }

        const newUser = new User(userData)

        //Encrypt password
        const salt = bcrypt.genSaltSync()
        newUser.password = bcrypt.hashSync(newUser.password, salt)

        //Generate JWT
        const token = await generateJWT(newUser.id)

        await newUser.save()

        res.send('Done')
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            ok: false,
            msg: 'An error occurred, contact an administrator',
        })
    }
}

export default createUser
