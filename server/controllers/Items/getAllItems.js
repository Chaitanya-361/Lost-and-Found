import Item from '../../models/Item.js'

const getAllItems = async (req, res) => {
    try {
        const items = await Item.find()
        return res.status(200).json({ items })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            ok: false,
            msg: 'An error occurred, contact an administrator',
        })
    }
}

export default getAllItems
