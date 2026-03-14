
// ---- Dependencies
const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;
// const path = require('path')
const db = require('./database')

// ---- Config

// ---- Middlewares
// app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))
app.use(express.json())
app.use(cors())

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes)

// app.METHOD('URI', CALLBACK)
app.get('/', (req, res) => {
    // res.METHOD, res means response
    res.send('Hello world')
})

process.on('SIGINT', () => {
    db.close((err) => {
        if(err) {
            console.error(`Error: ${err.message}`)
        }
        
        console.log('Closed the database connection successfully.')
        process.exit(0)
    })
})

app.listen(port, () => {
    console.log(`The app is listening at http://localhost:${port}`)
})