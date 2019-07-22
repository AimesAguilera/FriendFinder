
var path = require('path');


module.exports = function(app) {

    app.get('/survey', function(req, res) {
        res.sendFile(path.join(__dirname, '/../public/survey.html'));
    });

    // THIS DEFAULTS TO 'HOME' IF NO MATCH IS FOUND.
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '/../public/home.html'));
    });

};