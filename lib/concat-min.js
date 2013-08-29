var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;
var fs = require('fs');
var concatMin = {
    readScripts : function(scriptPaths){
        var scriptContentsArray = [];
        for(var i in scriptPaths){
            scriptContentsArray.push(fs.readFileSync(scriptPaths[i]));
        }
        return scriptContentsArray;
    },
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
    },
    writeBuild : function(builtJs, buildConfig){
        var dest = buildConfig.destination;
        fs.writeFileSync(dest, builtJs);
    }
};

module.exports = concatMin;

