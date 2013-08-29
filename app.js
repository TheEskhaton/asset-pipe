var sort = require('./lib/dependency-sorter');
var AssetPipe = function( config, basePath ) {
     /* Events */
    var pipeEvents = []
    var PipeEvent = function(name){
        this.name = name;
        this.handlers = [];
    };

    this.on = function(evtName, fn){
            var hasEvents = false;
            for(var key in pipeEvents){
                var val = pipeEvents[key];
                 if(val.name === evtName){
                    val.handlers.push(fn);
                    hasEvents = true;
                }
            }
            if(!hasEvents){
                var newGlobal = new PipeEvent(evtName);
                newGlobal.handlers.push(fn);
                pipeEvents.push(newGlobal);
            }
    };
    this.fire = function(evtName){
        for(var key in pipeEvents){
            var val = pipeEvents[key];
            if(val.name === evtName){
                for(var handlerKey in val.handlers){
                    var handler = val.handlers[handlerKey];
                    handler();
                }
            }
        }
    };
    /* Init */
    this.fire('init');
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
    this.basePath = basePath || '/';
    
    
    this.buildScriptTags = function(){
        var scriptTags = '';
        var sortedScripts = sort(config.scripts);
        for(var key in sortedScripts){
            var scriptName = sortedScripts[key];
            var script = config.scripts[scriptName];
            scriptTags += '<script src="'+this.basePath+script.path+'" type="text/javascript"></script>';  
        }


        return scriptTags;
    }
    this.buildCssTags = function(){
        var cssTags = '';
        for(var css in config.styles){
            cssTags+= '<link href="'+this.basePath+config.styles[css]+'" rel="stylesheet" />';
        }
        return cssTags;
    }


    this.parse = function(html){
        this.fire('beforeParse');
        var scripts = this.buildScriptTags();
        var styles = this.buildCssTags();
        var parsedHtml = html.replace(/{{ js }}/g, scripts).replace(/{{ css }}/g, styles);
        this.fire('afterParse');
        return parsedHtml; 
    } 
}

module.exports = AssetPipe; 
