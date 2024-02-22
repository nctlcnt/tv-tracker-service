import express from 'express'
const router = express.Router()

/* GET home page. */
router.get('/', async (req, res) => {
    res.send('success').status(200)
})

export default router
