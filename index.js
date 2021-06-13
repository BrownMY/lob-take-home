const express = require('express')
const addressList = require('./addresses.json')
// const dotenv = require('dotenv')

// dotenv.config()

const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to the Homepage.')
})

app.get('/addresses', (req, res) => {
    res.send(addressList)
})

app.listen(3000, () => { console.log(`Port is running on 3000`)})