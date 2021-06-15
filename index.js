const express = require('express')
const addressList = require('./addresses.json')
const cors = require('cors')
// const dotenv = require('dotenv')

// dotenv.config()

const app = express()
app.set('view engine', 'ejs')

app.use(cors())
app.use(express.static('/public'))

app.get('/', (req, res) => {
    res.send('Welcome to the Homepage.')
})

app.get('/addresses', (req, res) => {
    res.send(addressList)
})

app.get('/addresses/:filterAddresses', (req, res) => {
    let filteredAddresses = []
    const filterAddressesFromSearch = () => {
        for (let address of addressList) {
            let addressValues = Object.values(address)
            let filtered = addressValues.filter(address => address.includes(req.params.filterAddresses))

            for (let addressLines of addressValues) {
                if (addressLines == filtered) {
                    filteredAddresses.push(address)
                }
            }

        }
    }
    filterAddressesFromSearch()
    res.send(filteredAddresses)
})



app.get('/home', (req, res) => {
    res.render('index')
})


app.listen(8000, () => { console.log(`Port is running on 8000`)})