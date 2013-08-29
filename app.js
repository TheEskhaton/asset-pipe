
var extend = require('./lib/extend');

var AssetPipe = function( config, basePath ) {
    this.fire('init');
    this.config = config = config || require('./assets'); 
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

}
extend(AssetPipe.prototype, require('./lib/event-functions'));
extend(AssetPipe.prototype, require('./lib/builder-functions'));

AssetPipe.prototype.parse = function(html){
        this.fire('beforeParse');
        var scripts = this.buildScriptTags();
        var styles = this.buildCssTags();
        var parsedHtml = html.replace(/{{ js }}/g, scripts).replace(/{{ css }}/g, styles);
        this.fire('afterParse');
        return parsedHtml; 
    } 

module.exports = AssetPipe;
