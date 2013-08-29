
var extend = require('./lib/extend');
var concatMin = require('./lib/concat-min');
var sort = require('./lib/dependency-sorter');

var AssetPipe = function( config, basePath ) {
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
        if(this.config.environment === 'production'){
            this.build();
        }
        var parsedHtml = html.replace(/{{ js }}/g, scripts).replace(/{{ css }}/g, styles);
        this.fire('afterParse');
        return parsedHtml; 
    } 
AssetPipe.prototype.build = function(){
    this.fire('beforeBuild');
    var buildConfig = this.config.build;
    var baseFilesPath = buildConfig.baseFilesPath;
    var devScripts = this.config.development.scripts;
    var sortedScripts = sort(devScripts);
    var sortedScriptPaths = [];
    for(var key in sortedScripts){
        var scriptName = sortedScripts[key];
        var script = this.config.scripts[scriptName];
        sortedScriptPaths.push(__dirname+baseFilesPath+script.path);
    }
    var builtScripts = concatMin.build(sortedScriptPaths);
    buildConfig.destination = __dirname+baseFilesPath+buildConfig.destination;
    concatMin.writeBuild(builtScripts, buildConfig);
    this.fire('afterBuild');
}

module.exports = AssetPipe;
