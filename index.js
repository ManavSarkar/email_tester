const express = require('express');
const app = express();
const axios = require('axios');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(cors());
dotenv.config();



const port = process.env.PORT || 5000;

// use frontend build folder if production
if (process.env.NODE_ENV === 'production') {
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
if (process.env.NODE_ENV == "production") {
    console.log("In production stage");
    app.use(express.static("./client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}


// get all mails
app.get('/apirefreshmails', (req, res) => {
    const APIKEY = process.env.API_KEY;
    const NAMESPACE = process.env.NAMESPACE;
    axios.get(`https://api.testmail.app/api/json?apikey=${APIKEY}&namespace=${NAMESPACE}&pretty=true&livequery=true`)
        .then(response => {
            // console.log(response.data);
            res.json(response.data);
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
});



app.listen(port, () => {
    console.log('Listening on port 3000');
}
);