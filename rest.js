let express = require("express");
let mongoose = require("mongoose");
let morgan = require("morgan");
let size = require('./models/size')(mongoose);
let cors = require('cors');
let app = express();
let port = 8082;
let mongo_url = process.env.MONGO_URL || 'mongodb://192.168.50.10:27017/pcs' || 'mongodb://localhost:27017/pcs';

console.log("mongo_url", mongo_url, typeof mongo_url);

app.use(cors());
app.use(morgan('dev'));

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

app.route('/').get(function (req, res) {
    res.status(200).send("Rest-API is running.")
});

function createDBRecords(x) {
    let newSize = new size(x);
    newSize.save(function (err) {
        if (err) console.error(err);
    });
}

let records = [{
    "from": 0.0,
    "to": 35.0,
    "title": "XS"
}, {
    "from": 35.0,
    "to": 50.0,
    "title": "S"
}, {
    "from": 50.0,
    "to": 65.0,
    "title": "M"
}, {
    "from": 65.0,
    "to": 80.0,
    "title": "L"
}, {
    "from": 80.0,
    "to": 300.0,
    "title": "XL"
}];

function checkDBRecords() {
    size.count().lean().exec(function (err, count) {
        if (err) console.error(err);
        else console.info(count);
        if (count === 0) {
            records.forEach(function (x) {
                createDBRecords(x);
            });
        }
    });
}

let promise = mongoose.connect(mongo_url, function () {
    app.listen(port, function () {
        checkDBRecords();
        console.info("http://localhost:" + port);
    });
});
console.info(promise);

process.on("SIGINT", function () {
    process.kill(process.pid, "SIGTERM");
    mongoose.connection.close();
});