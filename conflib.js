const jsonfile = require("jsonfile");
const request = require('request');
const server = "http://localhost:3000";
const filePath = "cache.json"



class conflib {

    constructor() {

    }
    init() {
        // this funciton init the object, This is like the constructor.
        // This function return promise after the read of the cached file.
        this.alreadyUsedKeys = {};
        return this.readFile();

    }
    getKey(key) {
        // the function recive a key and return the value of the key.
        // if the key is already in the values that already sent to the app it
        // it return the prev value.
        if (this.alreadyUsedKeys[key]) {
            return new Promise((resolve, reject) => resolve(this.alreadyUsedKeys[key]));
        }
        let updateFunc = (key) => {
            if (!this.cache) {
                return new Promise((resolve, reject) => resolve(undefined));
            }

            let value = this.cache[key];
            this.alreadyUsedKeys[key] = value;
            return value;
        }

        if (!this.cache) {
            console.log("no value found, make request for conf file from server")
            return this.updateConfFromServer().then(() => {
                return updateFunc(key);
            });

        }

        return new Promise((resolve, reject) => {
            resolve(updateFunc(key))
        })
    }
    readFile() {
        // read the cach file and return  a promise.
        return new Promise((resolve, reject) => {
            jsonfile.readFile(filePath, (err, res) => {
                if (err) {

                } else {
                    this.cache = res;


                }
                resolve();
            });
        });
    }
    updateConfFromServer() {
        //the function ask for configuration from the server and save it to cache file.
        return new Promise(function(resolve, reject) {
            request.get(server + "/configuration", (err, res, body) => {
                body = JSON.parse(body);
                jsonfile.writeFile(filePath, body.conf);
                this.cache = body.conf;
                resolve();
            });
        }.bind(this));
    }
    setServer(serverUrl) {
      server = serverUrl
    }

}

module.exports = conflib;
