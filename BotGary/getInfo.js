module.exports = {
    requests: {
        postRequest: function (url, obj, callback) {
            request.post(
                url,
                { json: obj },
                function (error, res, body) {
                    if (!error && res.statusCode == 200) {
                        callback(body, error, res);
                    }
                }
            );
        },
        getRequest: function (url, callback) {
            request(url, { json: true }, function (error, res, body) {
                if (error) { return console.log(error); }
                callback(body, error, res);
            });
        }
    }
};