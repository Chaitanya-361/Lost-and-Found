import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const secretKey = process.env.SECRET_KEY

const generateJWT = async (id) => {
    const token = jwt.sign({ id }, secretKey, {
        expiresIn: '24h',
    })
    return token
}

export default generateJWT
