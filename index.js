const express  = require('express');
const app = express();
const port = 8000;
const interview = require('./src/controller/interview');
const axios = require('axios');

// This is the route to get and post the interview api,
// to call the api from postman: http://localhost:8000/api/interview
// For this project, we only have one route, but I think it's a good practise to wrap all routes under /api
app.use(express.json())
app.use(express.urlencoded())
app.use('/api/interview', interview)

module.exports = app.listen(port, async () => {
    console.log('We are live on ' + port);

    //To continuously call the apis and return result, I set an interval of 2 seconds to continuously call the interview api
    const interviewUrl = "http://localhost:" + port + "/api/interview";
    let num = 0;
    let intervalID = null;
    intervalID = setInterval(async () => {
        num ++;
        console.log("\n--------------------------" + num + "----------------------")
        try {
            const resp = await axios.get(interviewUrl)
            console.log(resp.data)
        }
        catch (e) {
            clearInterval(intervalID)
            // console.log(e)
        }
    }, 2000)

})

