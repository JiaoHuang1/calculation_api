const express  = require('express');
const router = express.Router();
const axios = require('axios');
const bigDecimal = require('js-big-decimal');

// Three steps to the get route:
// step 1: call the external get api
// step 2: used response from step 1 to calculate result (by calling the helper routes below)
// step 3: send id and result to the external api to get final response and return
router.get('/', async function (req, res){
    //step 1: call the get api
    try {
        const getURL = 'https://interview.adpeai.com/api/v1/get-task'
        const resp = await axios.get(getURL)

        //get id and calculation parameters from response
        const {id, operation, left, right} = resp.data;

        //step 2: call calculation apis
        //Note: the calculate can happen inside here, instead of building separate APIs, but separate APIs can help us test the feature well
        let urlPrefix = 'http://localhost:8000/api/interview'
        let response;
        switch (operation) {
            case "addition":
                response = await axios.post(urlPrefix + '/add', {
                    left, right
                })
                break;
            case "subtraction":
                response = await axios.post(urlPrefix + '/subtract', {
                    left, right
                })
                break;
            case "multiplication":
                response = await axios.post(urlPrefix + '/multiply', {
                    left, right
                })
                break;
            case "division":
                response = await axios.post(urlPrefix + '/divide', {
                    left, right
                })
                break;
            case "remainder":
                response = await axios.post(urlPrefix + '/modulus', {
                    left, right
                })
                break;
        }
        
        let result = response.data

        console.log("\n", "id:", id, "\n", "operation:", operation, "\n", "left:", left, "\n", "right:", right, "\n", "result:", result, "\n")

        //step 3: call the post api and compare my calculation
        //Note: the result calculated by bigDecimal library is a string, so I converted it to number in postURL body
        try {
            const postResp = await axios.post(urlPrefix, {
                id, result
            })
            res.send(postResp.data)
        }
        catch (e) {
            res.send(e.response.data)
        }

    }
    catch (e) {
        res.send(e.message)
    }
})

// Below are the helper route

// this post route is to call the external post route with id and result input
router.post('/', async function(req, res) {
    res.set('Content-Type', 'text/plain');
    id = req.body.id;
    result = req.body.result;
    const postURL = 'https://interview.adpeai.com/api/v1/submit-task'
        try {
            const postResp = await axios.post(postURL, {
                id, result
            })
            res.send(postResp.data)
        }
        catch (e) {
            res.send(e.response.data)
        }
    
})

// seperated the add, subtract, mulptipy, divide, modulus calucation to separate route so we can test it

router.post('/add', function(req, res) {
    res.set('Content-Type', 'text/plain');
    res.end(bigDecimal.add(req.body.left, req.body.right))
})

router.post('/subtract', function(req, res) {
    res.end(bigDecimal.subtract(req.body.left, req.body.right))
})

router.post('/multiply', function(req, res) {
    res.end(bigDecimal.multiply(req.body.left, req.body.right))
})

router.post('/divide', function(req, res) {
    res.end(bigDecimal.divide(req.body.left, req.body.right, 16))
})

router.post('/modulus', function(req, res) {
    res.end(bigDecimal.modulus(req.body.left, req.body.right))
})

module.exports = router