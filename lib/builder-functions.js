var sort = require('./dependency-sorter');
module.exports = {
    buildScriptTags : function(){
        var scriptTags = '';
        var sortedScripts = sort(this.config.scripts);
        for(var key in sortedScripts){
            var scriptName = sortedScripts[key];
            var script = this.config.scripts[scriptName];
            scriptTags += '<script src="'+this.basePath+script.path+'" type="text/javascript"></script>';  
        }
        return scriptTags;
    },
    buildCssTags : function(){
        var cssTags = '';
        for(var css in this.config.styles){
            cssTags+= '<link href="'+this.basePath+this.config.styles[css]+'" rel="stylesheet" />';
        }
        return cssTags;
    }
}
