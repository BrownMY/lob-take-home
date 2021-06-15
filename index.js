const express = require('express')
//Import addresses.json into app
const addressList = require('./addresses.json')


const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to the Homepage. Please visit url /addresses to view all addresses')
})

app.get('/addresses', (req, res) => {
    res.send(addressList)
})

app.get(`/addresses/:filter`, (req, res) => {
    let filteredAddresses = []
    //Iterates through each object in the data set
    const filterAddressesFromSearch = () => {
        for (let address of addressList) {
            //Object.values() returns an array of all the values to an object. In this case, the values of each address object in addressList is assigned to addressValues on each iteration.
            let addressValues = Object.values(address)
            //filtered is the array returned after using filter() to check the url params and compare them to each element in addressValues. the array contains the matching result
            let filtered = addressValues.filter(address => address.includes(req.params.filter))
            console.log(filtered)
            //Checks each element in addressValues for a matching string in the filtered array on each iteration. Pushes the matches to filteredAddresses array to display.
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

app.post(`/addresses`, (req, res) => {
    const newAddress =
    {
        line1: "869 Beach st.",
        city: "Detroit",
        state: "MI",
        zip: "48235"
    }
    addressList.push(newAddress)
    res.send(addressList)
})

//Other ways to manage the data would be using the DELETE, and PUT HTTP methods on the data set. I ran out of time here.
//Ex. app.delete(), app.put()



app.listen(8000, () => { console.log(`Port is running on 8000`) })