var express = require("express");
var path = require("path");
var app = express();
var port = 8080;

// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, '/views'));
app.use(express.static('./'));

app.route('/api/getGirthSize').get(function (req, res) {
    var self = JSON.parse(req.query.size);
    if (self) {
        var input = self["length"] + 2 * self["width"] + 2 * self["height"];
        var size = "---";
        if (input >= 0 && input <= 35) size = "XS";
        else if (input > 35 && input <= 50) size = "S";
        else if (input > 50 && input <= 65) size = "M";
        else if (input > 65 && input <= 80) size = "L";
        else if (input > 80 && input <= 300) size = "XL";
        res.json({size: size});
    }
});

app.route("/*").get(function (req, res) {
    res.redirect('/');
});

app.listen(port, function () {
    console.info("http://localhost:" + port);
});

process.on("SIGINT", function () {
    process.kill(process.pid, "SIGTERM");
});