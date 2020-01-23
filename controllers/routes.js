const db = require('../models');

module.exports = function(app) {
    app.get("/", function(request,response) {
        response.render('hello');
    });
};