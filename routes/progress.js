import express from 'express'
import db from '../database/connection.js'
import { ObjectId } from 'mongodb'
const router = express.Router()

/* GET home page. */
router.get('/', async (req, res) => {
    let collection = await db.collection('progress')
    // let results = await collection.find({}).toArray()
    let results = await collection
        .aggregate([
            {
                $lookup: {
                    from: 'shows',
                    localField: 'showId',
                    foreignField: 'showId',
                    as: 'showDetails',
                },
            },
            {
                $sort: {
                    'watchedAt': -1,
                },
            },
        ])
        .toArray()

    if (!results) res.send('Not found').status(404)
    else res.send(results).status(200)
})

router.post('/', async (req, res) => {
    console.log(req.body)
    if (!req.body.createdBy) res.send('No user selected').status(404)
    let collection = await db.collection('progress')
    let result = await collection.insertOne({ ...req.body, createdBy: new ObjectId(req.body.createdBy) })

    if (!result) res.send('Not found').status(404)
    else res.send(result).status(200)
})

router.delete('/:id', async (req, res) => {
    let collection = await db.collection('progress')
    let query = { _id: new ObjectId(req.params.id) }
    let result = await collection.deleteOne(query)

    if (!result) res.send('Not found').status(404)
    else res.send(result).status(200)
})

export default router
