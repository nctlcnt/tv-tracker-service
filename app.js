import express from 'express'
import cors from 'cors'
import list from './routes/index.js'
import users from './routes/users.js'
import shows from './routes/shows.js'
import progress from './routes/progress.js'

const PORT = process.env.PORT || 5050
const app = express()

console.log(process.env.CORS_ORIGIN)

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(express.json())
app.use('/', list)
app.use('/users', users)
app.use('/shows', shows)
app.use('/progress', progress)

// start the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
