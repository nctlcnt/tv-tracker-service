import express from 'express'
import db from '../database/connection.js'
import { ObjectId } from 'mongodb'
const router = express.Router()

/* GET home page. */
router.get('/', async (req, res) => {
    let collection = await db.collection('progress')
    let results = await collection.find({}).toArray()

    if (!results) res.send('Not found').status(404)
    else res.send(results).status(200)
})

router.post('/', async (req, res) => {
    let collection = await db.collection('progress')
    let result = await collection.insertOne({ ...req.body, createdBy: new ObjectId(req.body.createdBy) })

    if (!result) res.send('Not found').status(404)
    else res.send(result).status(200)
})

export default router
