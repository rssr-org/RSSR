const fakeApiData = {
    "posts": [
        {
            "id": 0,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit. suscipit recusandae consequuntur expedita et cum. reprehenderit molestiae ut ut quas totam. nostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            "id": 1,
            "title": "qui est esse",
            "body": "est rerum tempore vitae. sequi sint nihil reprehenderit dolor beatae ea dolores neque. fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis. qui aperiam non debitis possimus qui neque nisi nulla"
        },
        {
            "id": 2,
            "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
            "body": "et iusto sed quo iure. voluptatem occaecati omnis eligendi aut ad. voluptatem doloribus vel accusantium quis pariatur. molestiae porro eius odio et labore et velit aut"
        },
        {
            "id": 3,
            "title": "eum et est occaecati",
            "body": "ullam et saepe reiciendis voluptatem adipisci. sit amet autem assumenda provident rerum culpa. quis hic commodi nesciunt rem tenetur doloremque ipsam iure. quis sunt voluptatem rerum illo velit"
        },
        {
            "id": 4,
            "title": "nesciunt quas odio",
            "body": "repudiandae veniam quaerat sunt sed. alias aut fugiat sit autem sed est. voluptatem omnis possimus esse voluptatibus quis. est aut tenetur dolor neque"
        },
        {
            "id": 5,
            "title": "dolorem eum magni eos aperiam quia",
            "body": "ut aspernatur corporis harum nihil quis provident sequi. mollitia nobis aliquid molestiae. perspiciatis et ea nemo ab reprehenderit accusantium quas. voluptate dolores velit et doloremque molestiae"
        }
    ],
    "skeleton": {
        "dailyMessage": "Be happy! Life is too short."
    },
    "signin": {
        "token": "salkhfasoidpaskdpksapdksakdpisapdiasdphdpksapdksakdpisapdiasdphdpksapdksakdpisapdiasdphdioashdoihsaoid"
    },
    "signup": {
        "token": "salkhfasoidpaskdpksapdksakdpisapdiasdphdpksapdksakdpisapdiasdphdpksapdksakdpisapdiasdphdioashdoihsaoid"
    },
    "userDetails": {
        "firstName": "dan",
        "lastName": "abramov",
        "phone": "+123456789",
        "email": "dan.abramov@gmail.com"
    },
    "forgetPassword": {
        "message": "mail sent successfully. check your eamil."
    },
    "resetPasswordTrust": {
        "message": "token is valid."
    },
    "resetPasswordSubmit": {
        "message": "token is valid."
    }
}



module.exports = function (app) {

    app.use('/fake-api/:name/:id?', function (req, res) {
        const {name, id} = req.params;
        const delay = req.query.delay || 1
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
            setTimeout(function () {
                res.status(200).json(result)
            },delay)
        else
            res.status(404).send('not found')

    })
}