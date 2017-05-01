/*
 * A GET Route to `/survey` which should display the survey page.
 * A default USE route that leads to `home.html` which displays the home page. 
 */

var path = require("path");

module.exports = function(app) {

    app.use("/home", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });

    app.use("/style.css", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/style.css"));
    });

    app.use("/script.js", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/script.js"));
    });

    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });

}