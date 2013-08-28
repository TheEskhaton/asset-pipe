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
        for(var script in config.scripts){
            scriptTags+= '<script src="'+basePath+config.scripts[script]+'" type="text/javascript"></script>';
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
