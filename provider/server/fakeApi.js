process.env.NODE_ENV = 'development';
require('rssr-env-loader')

const express = require('express')
const cors = require('cors')
const fakeApiData = require('../setup/fakeApiData')
const app = express()


app.use(cors())

app.use('/:name/:id?', function (req, res) {
    const {name, id} = req.params;

    let result;

    if (name)
        result = fakeApiData[name]

    if (id) {
        if (Array.isArray(result)) {
            const idResult = result.some(function (item) {
                const isEqual = String(item.id) === id;

                if (isEqual)
                    result = item

                return isEqual;
            })

            if (!idResult)
                result = undefined;
        } else {
            result = undefined;
        }
    }

    if (result)
        res.status(200).json(result)
    else
        res.status(404).send('not found')

})




app.listen(8080, error => {
    if (error) {
        return console.error('Error in server/fakeApi.js: ', error);
    } else {
        console.log('fake API server running at http://localhost:8080');
    }
})
