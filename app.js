var getSortedDependencies = function(scripts){
    var unsorted = [];
    for(var key in scripts){
        unsorted.push(key);
    }
    for(var key in scripts){
        var script = scripts[key];
        if(script.dependsOn){
            for(var dep in script.dependsOn){
                var dependency = script.dependsOn[dep];
                var depInd = unsorted.indexOf(dependency);
                var keyInd = unsorted.indexOf(key);
                while(depInd > keyInd){
                    if(unsorted.length >= keyInd+1){
                        var tmp = unsorted[keyInd+1];
                        unsorted[keyInd+1] = unsorted[keyInd];
                        unsorted[keyInd] = tmp;
                        keyInd = unsorted.indexOf(key);
                    }    
                }
            }
        }
    }
    return unsorted;
}

var AssetPipe = function( config, basePath ) {
    var config = config || require('./assets'); 
    if(!config) throw new Error('Please provide a configuration');
    if(config.environment){
        if(config.environment === 'development'){
            config.scripts = config.development.scripts;
            config.styles = config.development.styles;
        }
        else if(config.environment === 'production'){
            config.scripts = config.production.scripts;
            config.styles = config.production.styles;
        }
    }
    basePath = basePath || '/';
    
    
    this.buildScriptTags = function(){
        var scriptTags = '';
        var sortedScripts = getSortedDependencies(config.scripts);
        for(var key in sortedScripts){
            var scriptName = sortedScripts[key];
            var script = config.scripts[scriptName];
            scriptTags += '<script src="'+basePath+script.path+'" type="text/javascript"></script>';  
        }


        return scriptTags;
    }
    this.buildCssTags = function(){
        var cssTags = '';
        for(var css in config.styles){
            cssTags+= '<link href="'+basePath+config.styles[css]+'" rel="stylesheet" />';
        }
        return cssTags;
    }


    this.parse = function(html){
       var scripts = this.buildScriptTags();
       var styles = this.buildCssTags();

       return html.replace(/{{ js }}/g, scripts).replace(/{{ css }}/g, styles);
    }
}

module.exports = AssetPipe; 

var pipe = new AssetPipe();

console.log(pipe.parse('<head>{{ js }} {{ css }}</head>'));
