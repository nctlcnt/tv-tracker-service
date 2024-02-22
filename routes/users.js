import express from 'express'
const router = express.Router()
import db from '../database/connection.js'
import { ObjectId } from 'mongodb'

/* GET users listing. */

router.get('/', async (req, res, next) => {
    let collection = await db.collection('users')
    let results = await collection.find({}).toArray()

    if (!results) res.send('Not found').status(404)
    else res.send(results).status(200)
})

router.get('/:id', async (req, res, next) => {
    let collection = await db.collection('users')
    console.log(req.params.id)
    let query = { _id: new ObjectId(req.params.id) }
    let result = await collection.findOne(query)
    // let result = await collection.find({}).toArray()
    // res.send(req.params.id).status(200)
    if (!result) res.send('Not found').sendtatus(404)
    else res.send(result).status(200)
})

router.post('/:id', async (req, res, next) => {
    let collection = await db.collection('users')
    let query = { _id: new ObjectId(req.params.id) }
    let update = { $set: req.body }
    let result = await collection.updateOne(query, update)

    if (!result) res.send('Not found').status(404)
    else res.send(result).status(200)
})

export default router
