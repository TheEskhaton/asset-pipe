module.exports = function(obj1, obj2){
    for(var key in obj2){
        if(obj2.hasOwnProperty(key)){
            obj1[key] = obj2[key];
        }
    }
}
