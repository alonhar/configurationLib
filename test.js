const conflib = require("./conflib");
const server = require("./server");
const assert = require('assert');
const fs = require("fs");
var confObject = new conflib();

server.startServer(function() {
    confObject.init().then(test)

})



function test() {
    var checkKey = function(key, x, testName) {
        return confObject.getKey(key).then((res) => {
            assert.equal(res, x);
            console.log(testName)
        })
    }
    var removeCacheFile = function() {
        fs.unlink("./cache.json", function() {
            console.log("cache file removed")
        })
    }

    checkKey("key1", "a", "key1 == a")

    .then(() => {
            server.changeConf();
            return confObject.updateConfFromServer()
        })
        .then(() => checkKey("key2", "y", "key2 == y"))
        .then(() => checkKey("key1", "a", "key1 == a  after the lib received key1==x from the server"))
        .then(() => checkKey("key3", undefined, "key3 == undefined -- not value in the cache"))
        .then(() => {
            confObject = new conflib();
            console.log("make new object Load data from file cach  -- similar to restart the app");
            return confObject.init()
        })
        .then(() => {
            checkKey("key1", "x", "key1 == x ")
        })
        .then(() => {

            checkKey("key2", "y", "key2 == y ")
        }).then(() => {
            server.kill();
            removeCacheFile();
        }, function(err) {
            server.kill();
            removeCacheFile();
            console.log(err)
        })







}
