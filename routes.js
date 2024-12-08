const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('content-type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit Data</button></form></body>');
        res.write('</html>');
        return res.end();
    
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            console.log(parsedBody.split('='));
            const message = parsedBody.split('=')[1];
    /*             fs.writeFileSync('message.txt', message);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end(); */
    // This is a better way to handle asynch file writing and not blocking the execution of the code
            fs.writeFile('message.txt', message, (err) =>{
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            })
        });
    }
}

module.exports = requestHandler;
