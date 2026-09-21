import generateJWT from '../../utils/generateJWT.js'

export const renewToken = async (req, res) => {
    const id = req.id

    const token = await generateJWT(id)

    res.status(200).json({ ok: true, id, token: token })
}
