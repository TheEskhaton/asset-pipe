var sort = function(scripts){
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

module.exports = sort;
