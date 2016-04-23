var express = require('express');
var speakeasy = require('speakeasy');
var moment = require('moment');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

router.post('/gen', function (req, res) {
    var secret = req.body.secret;
    var drift = req.body.drift;
    var windowSize = 30; // seconds

    var pins = [];
    for(var i = - drift ; i <= drift; ++i ) {

        var offset = i * windowSize;

        var pin = speakeasy.totp({
            secret: secret,
            encoding: 'hex',
            algorithm: 'sha1',
            time : moment().add(offset, 'seconds').unix()
        });
        pins.push({ driftIndex : i, pin : pin, current : offset == 0});
    }

    res.json(pins);
});
module.exports = router;
