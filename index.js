const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'UserID.html'))
} )
app.set('port', port)

server.listen(port, () => console.log(`server running on port ${port}`))