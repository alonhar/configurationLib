# configurationLib


##Installation

```git clone https://github.com/alonhar/configurationLib```

Put conflib.js inside you project.

```
   const conflib = require("./conflib");
   var confObject = new confObject();
```


##API

###confObject.init()  
> this funciton init the object, This is like the constructor.
> return promise after the read of the cached file.


###confObject.getKey(key)
> the function recive a key and return the value of the key.
> if the key is already in the values that already sent to the app it
> and the cache was update from  the server,It will return the prev value.

###confObject.readFile()
>  read the cach file and return  a promise.

###confObject.updateConfFromServer()
>  make request for configuration from the server and save it to cache file.


###confObject.setServer(serverUrl)
> the function set the url of the server. The It will make http get request to `/configuration` to get the json.
> server defualt value is `localhost:3000`


##Testing 
run 
```
git clone https://github.com/alonhar/configurationLib
cd configurationLib/test
node test.js
```
