const express = require('express');
const path = require('path');
const http = require('http');
const exp = require('constants');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'UserID.html'))
} )

app.set('port', port)
const server = http.createServer(app)

server.listen(port, () => console.log(`server running on port ${port}`))