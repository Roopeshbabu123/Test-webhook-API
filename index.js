const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const { Console } = require('console');

const app = express();
const port = 8443;
// Middleware to parse JSON bodies
app.use(bodyParser.json());



app.get('/webhook', (req, res) => {    
    const adobeSignClientId = req.headers['x-adobesign-clientid'];
    res.setHeader('x-adobesign-clientid',adobeSignClientId);
    
    res.send(`GET request received with clientId: ${adobeSignClientId}`);
    console.log('x-adobesign-clientid:', adobeSignClientId);
});

// POST endpoint
app.post('/webhook', (req, res) => {
    var clientid = req.headers['x-adobesign-clientid'];
    if (clientid == "CBJCHBCAABAAeWAPme8oFbAPZTqb9W15dXkExVU9Qr7l") 
    {
        var responseBody = {
                        "xAdobeSignClientId" : clientid // Return Client Id in the body
        };
        //res.headers['Content-Type'] = 'application/json';
        res.body = responseBody;
        res.status = 200;
        console.log(JSON.stringify(responseBody));
        res.send(`Received with clientId: ${clientid}`);
    }    
});

// HTTPS options
const httpsOptions = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

app.listen(port, () => {
    console.log(`Webhook server is listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.status(200).send("Home Page");
})

app.get("/about", (req, res) => {
    res.status(200).send("About Page");
})