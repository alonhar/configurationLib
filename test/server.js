var express = require('express')
var app = express()
var conf = { "conf": {"key1": "a", "key2": "b"}}
module.exports = {}
module.exports.startServer = function(cb){

app.get('/configuration', function (req, res) {
  console.log('\x1b[33m%s\x1b[0m: ',"server response with conf == " + JSON.stringify(conf));
    res.json(conf);
})

var server = app.listen(3000, function () {
  console.log('app listening on port 3000')
  module.exports.kill = function(){
    server.close();
  }
  cb();

})
}
module.exports.changeConf = function(){
    conf =  { "conf":{"key1": "x", "key2": "y"}};
}
