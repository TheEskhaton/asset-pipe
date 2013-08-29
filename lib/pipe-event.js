var PipeEvent = function(name){
    this.name = name;
    this.handlers = [];
};

module.exports = PipeEvent;
