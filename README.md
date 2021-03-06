## What is asset-pipe?

A function that replaces {{ js }} and {{ css }} template tags in html with the appropriate script and css link tags

## Installation

```
    npm install asset-pipe
```

## Example

``` javascript
    var AssetPipe = require('asset-pipe');
    var pipe = new AssetPipe(); // instantiates a new asset pipe with scripts and styles loaded from the assets.json file
    var inputHtml = '<head>{{ js }} {{ css }}</head>';
    var parsedHtml = pipe.parse(inputHtml);
```
assets.json:
``` javascript
     {
            "environment":"development", 
            "development" :
                {   
                    "scripts" : { "jquery":{
                            "path": "jquery.js"
                        }, 
                    "styles" : { "main": "main.css"}
                },
    }
```

This would output 

``` html
    <head><script src="/jquery.js" type="text/javascript"></script><link href="/main.css" rel="stylesheet" /></head>
```


The AssetPipe constructor optionally takes two parameters , "config", and "basePath". "config" replaces the json file with the given config, and the "basePath" parameter prepends a base path before the script and style sources.

