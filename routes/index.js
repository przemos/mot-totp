var express = require('express');
var speakeasy = require('speakeasy');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

router.post('/gen', function (req, res) {
    var secret = req.body.secret;
    var pin = speakeasy.totp({
        secret: secret,
        encoding: 'hex',
        algorithm: 'sha1'
    });
    res.json({pin: pin});
});
module.exports = router;
