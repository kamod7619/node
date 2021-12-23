module.exports = {
    sendResponse: function(data = [], msg = '') {
        // res.setHeader('Content-Type', 'application/json');
        // res.send(JSON.stringify({ a: 1 }, null, 3));
        return { status: true, data: data, msg: msg };
    },
    sendError: function(msg = []) {
        return { status: false, msg: msg };
    }

};