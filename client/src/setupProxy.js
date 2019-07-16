const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/api', { target :
    'http://localhost:5000/', changeOrigin : true}));
}

// htpp localhost 5000 =--> proxy httpp 3000
//react server : v local3000
//proxy local 3000

//nodejs server local host 5000
