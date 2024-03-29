import express from 'express'
import db from '../database/connection.js'
import { ObjectId } from 'mongodb'
const router = express.Router()

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        const results = await db
            .collection('shows')
            .aggregate([
                {
                    $lookup: {
                        from: 'progress',
                        let: { 'show_id': '$showId' },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$showId', '$$show_id'] } } },
                            { $sort: { watchedAt: -1 } },
                            { $limit: 1 },
                        ],
                        as: 'latestProgress',
                    },
                },
            ])
            .toArray()
        res.send(results).status(200)
    } catch (error) {
        if (!results) res.send('Not found').status(404)
    }
})
router.post('/', async (req, res, next) => {
    try {
        let collection = await db.collection('shows')
        let result = await collection.insertOne({ ...req.body, createdBy: new ObjectId(req.body.createdBy) })

        res.send(result).status(200)
        if (!result) res.send('Not found').status(404)
    } catch (error) {
        console.log(error)
        // Check if the error is due to duplication
        if (error.code === 11000) {
            res.status(409).json({ message: 'Duplicate entry. This record already exists.' })
        } else {
            // Log the error and respond with a generic server error message
            console.error(error)
            res.status(500).json({ message: 'An error occurred. Please try again later.' })
        }
    }
})

export default router
