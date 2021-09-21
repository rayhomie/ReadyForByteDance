var EventBus = /** @class */ (function () {
    function EventBus() {
        this.handlers = {};
    }
    EventBus.prototype.on = function (eventName, cb) {
        this._getHandlers(eventName).callbackStack.push(cb);
    };
    EventBus.prototype.off = function (eventName) {
        if (this.handlers[eventName]) {
            delete this.handlers[eventName];
        }
    };
    EventBus.prototype.emit = function (eventName) {
        this._getHandlers(eventName).callbackStack.forEach(function (callback) {
            return callback.call(callback);
        });
    };
    EventBus.prototype._getHandlers = function (eventName) {
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = {
                callbackStack: []
            };
        }
        return this.handlers[eventName];
    };
    return EventBus;
}());
//测试：
var EventInstance = new EventBus();
EventInstance.off("click");
EventInstance.on("click", function () {
    console.log("this is click");
});
EventInstance.on("hover", function () {
    console.log("this is hover");
});
EventInstance.on("click", function () {
    console.log("this is second click");
});
EventInstance.emit("click"); //this is click  this is second click
EventInstance.emit("hover"); //this is hover
EventInstance.off("click");
EventInstance.emit("click");
