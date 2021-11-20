const http = require('http');
const index = http.createServer();

index.on('request', (req, res) => {
    if (req.method == 'POST') {
        let body = '';
        req.on('data', function (data) {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            body = body.trim();
            const post = JSON.parse(body);
            switch(req.url) {
                case '/login':
                    if (post['phoneNumber'] === '001' && post['password'] === '1234') {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({
                            status: 'success',
                            user: {
                                firstName: 'Bobo',
                                lastName: 'Cohen'
                            },
                            token: 'fake-user-1'
                        }));
                    } else if (post['phoneNumber'] === '003' && post['password'] === '1234') {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({
                            status: 'success',
                            user: {
                                firstName: 'Yankale',
                                lastName: 'Shor'
                            },
                            token: 'fake-user-2'
                        }));
                    } else {
                        res.writeHead(400, {'Content-Type': 'application/json'});
                        res.end();
                    }
                    break;
                case '/isLogged':
                    if (post === 'fake-user-1' || post === 'fake-user-2') {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({
                            status: 'success'
                        }));
                    } else {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({
                            status: 'error'
                        }));
                    }
                default:
                    res.writeHead(404);
                    res.end();
            }
        });
    }

});

index.listen(8080);