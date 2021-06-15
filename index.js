const express = require('express')
const addressList = require('./addresses.json')
// const dotenv = require('dotenv')

// dotenv.config()

const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to the Homepage. Please visit url /addresses to view all addresses')
})

app.get('/addresses', (req, res) => {
    res.send(addressList)
})

app.get(`/addresses/:filter`, (req, res) => {
    let filteredAddresses = []
    const filterAddressesFromSearch = () => {
        for (let address of addressList) {
            //Needs to bring all to lowercase
            let addressValues = Object.values(address)
            let filtered = addressValues.filter(address => address.includes(req.params.filter))

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


app.listen(8000, () => { console.log(`Port is running on 8000`)})