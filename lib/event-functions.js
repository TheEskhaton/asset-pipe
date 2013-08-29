var PipeEvent = require('./pipe-event');
module.exports = {

    events : [],
    on : function(evtName, fn){
        var hasEvents = false;
        for(var key in this.events){
           var val = this.events[key];
             if(val.name === evtName){
                val.handlers.push(fn);
                hasEvents = true;
            }
        }
        if(!hasEvents){
            var newGlobal = new PipeEvent(evtName);
            newGlobal.handlers.push(fn);
            this.events.push(newGlobal);
        }
    },
    fire : function(evtName){
        for(var key in this.events){
            var val = this.events[key];
            if(val.name === evtName){
                for(var handlerKey in val.handlers){
                    var handler = val.handlers[handlerKey];
                    handler();
                }
            }
        }
    }
};
