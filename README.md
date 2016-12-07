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

-- no cache in configuration - getKey on empty cache 
-- {key1:"a",key2:"b"} - try get key1. check equal to key1 === "a".
-- update conf in the server to {key1:"x",key:"y"} - try get key1. check key1 ===  "a"
-- try get key2 - check it equal to  "y"
-- try get key3 - check it equal to  undefined.
-- create new confObject - check that the conf is loaded from the cache file and key1 ==="x" && key2==="y" 
