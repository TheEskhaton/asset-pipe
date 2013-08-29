var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;
var concatMin = {
    minify : function(script){
        var orig_code = script;
        var ast = jsp.parse(orig_code); 
        ast = pro.ast_mangle(ast);
        ast = pro.ast_squeeze(ast); 
        var final_code = pro.gen_code(ast);
        return final_code;
    },
    concatenate : function(scriptContentsArray){
        var script = "";
        for(var i in scriptContentsArray){
            script += "\n"+scriptContentsArray[i];
        }
        return script;
    },
    build: function(scriptContentsArray){
        var script = this.concatenate(scriptContentsArray);
        script = this.minify(script);
        return script;
    }
}
module.exports = concatMin;

