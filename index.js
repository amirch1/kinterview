const http = require('http');
const index = http.createServer();

index.on('request', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST') {
        res.writeHead(200);
        res.end(JSON.stringify({
            status: 'success',
            user: {
                firstName: 'test',
                lastName: 'test'
            },
            userToken: 'fake-user-1'
        }));
        /*
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
                        res.writeHead(200, headers);
                        res.end(JSON.stringify({
                            status: 'success',
                            user: {
                                firstName: 'Bobo',
                                lastName: 'Cohen'
                            },
                            userToken: 'fake-user-1'
                        }));
                    } else if (post['phoneNumber'] === '003' && post['password'] === '1234') {
                        res.writeHead(200, headers);
                        res.end(JSON.stringify({
                            status: 'success',
                            user: {
                                firstName: 'Yankale',
                                lastName: 'Shor'
                            },
                            userToken: 'fake-user-3'
                        }));
                    } else {
                        res.writeHead(400, headers);
                        res.end(JSON.stringify({
                            status: 'failure'
                        }));
                    }
                    break;
                case '/isLogged':
                    if (post === 'fake-user-1') {
                        res.writeHead(200, headers);
                        res.end(JSON.stringify({
                            status: 'success',
                            user: {
                                firstName: 'Bobo',
                                lastName: 'Cohen'
                            },
                            userToken: 'fake-user-1'
                        }));
                    } else if (post === 'fake-user-3') {
                        res.writeHead(200, headers);
                        res.end(JSON.stringify({
                            status: 'success',
                            user: {
                                firstName: 'Yankale',
                                lastName: 'Shor'
                            },
                            userToken: 'fake-user-3'
                        }));
                    } else {
                        res.writeHead(200, headers);
                        res.end(JSON.stringify({
                            status: 'failure'
                        }));
                    }
                default:
                    res.writeHead(404);
                    res.end();
            }
        });*/
    }
    res.writeHead(405);
    res.end(`${req.method} is not allowed for the request.`);

});

index.listen(process.env.PORT || 8080);
