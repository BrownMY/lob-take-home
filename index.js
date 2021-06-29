const express = require('express')
//Import addresses.json into app
let addressList = require('./addresses.json')


const app = express()

app.use(express.json())
app.set('view engine', 'ejs')

app.get('/api', (req, res) => {
    res.send('Welcome to the Homepage. Please visit url /addresses to view all addresses')
})

app.get('/api/addresses', (req, res) => {
    res.send(addressList)
})

app.get('/api/form', (req, res) => {
    // const updateAddress = {

    // }
    res.render('index')
})

app.get('/api/addresses/:id', (req, res) => {
    res.send(addressList[req.params.id])
})

app.get(`/api/addresses/find/:filter`, (req, res) => {
    let filteredAddresses = []
    //Iterates through each object in the data set
    const filterAddressesFromSearch = () => {
        for (let address of addressList) {
            //Object.values() returns an array of all the values to an object. In this case, the values of each address object in addressList is assigned to addressValues on each iteration.
            
            //do not include ID. if key != id ...
            let addressValues = Object.values(address)
            
            //filtered is the array returned after using filter() to check the url params and compare them to each element in addressValues. the array contains the matching result
            let filtered = addressValues.filter(address => address.includes(req.params.filter))
            //Checks each element in addressValues for a matching string in the filtered array on each iteration. Pushes the matches to filteredAddresses array to display.
           
            for (let addressLines of addressValues) {
                if (addressLines == filtered[0]) {
            
                    filteredAddresses.push(address)
                // } else {
                //     res.status(404).send('Address does not exist. Note: All first letters in addreses are capitalized. State initials are all CAPS.')
                // }
                }
            }

        }

    }
    filterAddressesFromSearch()
    res.send(filteredAddresses)
})

app.post(`/api/addresses`, (req, res) => {
    const newAddress =
    {
        id: addressList.length - 1,
        line1: req.body.line1,
        line2: req.body.line2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    }
    addressList.push(newAddress)
    res.send(newAddress)
})

app.put('/api/addresses/:id', (req, res) => {
    let addressToUpdate = addressList[req.params.id]
    const updateAddress = (toUpdate, updatedInfo) => {
        for (let key in addressToUpdate) {
            let addressFieldToUpdate = addressToUpdate[key]
            // console.log(`KEY: ${key}`)
            // console.log(`ADDRESS FTU: ${addressFieldToUpdate}`)
            // console.log(`ADDRESS TO UPDATE: ${addressToUpdate}`)
            // console.log(`UPDATED INFO: ${updatedInfo}`)
            // console.log(`TO UPDATE: ${toUpdate}`)
            if (toUpdate == "id") {
                res.send('You may not change the ID of an address.')
            } else if (toUpdate == !key) {
                res.send('You must update either: "line1", "line2", "city", "state", or "zip"')
            } else if (toUpdate == key) {
                addressFieldToUpdate = updatedInfo
            }
        }
        return addressList
    }
    updateAddress(req.body.toUpdateBody, req.body.updatedInfoBody)
    res.send(addressList)
})
//Other ways to manage the data would be using the DELETE, and PUT HTTP methods on the data set. I ran out of time here.
//Ex. app.delete(), app.post()
app.delete('/api/addresses/:id', (req, res) => {
    let addressToDelete = addressList[req.params.id]
    let newAddressList = []
    const deleteAddress = () => {
        for (let i = 0; i < addressList.length; i++) {
            if (addressList[i] !== addressToDelete) {
                newAddressList.push(addressList[i])
            }
        }
        addressList = newAddressList
        return addressList
    }
    deleteAddress()
    res.send(addressList)
})



app.listen(8000, () => { console.log(`Port is running on 8000`) })