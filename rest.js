let express = require("express");
let mongoose = require("mongoose");
let size = require('./models/size')(mongoose);
let cors = require('cors');
let app = express();
let port = 8082;

app.use(cors());
app.route('/api/getGirthSize').get(function (req, res) {
    let self = JSON.parse(req.query.size);
    if (self) {
        let input = self.length + 2 * self.width + 2 * self.height;
        size.findOne({from: {$lte: input}, to: {$gte: input}}, function (err, size) {
            if (err) res.status(503).send(err);
            else if (!size) res.json({size: "---"});
            else res.json({size: size.title});
        });
    } else res.status(428).send("Es wurde keine Größe übergeben.");
});

let promise = mongoose.connect('mongodb://192.168.178.27:27017/pcs', function () {
    app.listen(port, function () {
        console.info("http://localhost:" + port);
    });
});
console.info(promise);

process.on("SIGINT", function () {
    process.kill(process.pid, "SIGTERM");
    mongoose.connection.close();
});