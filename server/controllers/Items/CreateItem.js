import Item from '../../models/Item.js'

const createItem = async (req, res) => {
    try {
        const itemData = req.body
        
        const newItem = new Item(itemData)
        if (req.file) {
            newItem.img = req.file.path
        }
        await newItem.save()
        res.status(200).json({ ok: true, msg: 'Item Created' })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            ok: false,
            msg: 'An error occurred, contact an administrator',
        })
    }
}

export default createItem
