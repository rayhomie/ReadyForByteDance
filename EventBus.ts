type CallBack = (...args: any) => void;

type EventItem = {
  callbackStack?: CallBack[];
};

class EventBus {
  handlers: {
    [eventName: string]: EventItem;
  };
  constructor() {
    this.handlers = {};
  }

  on(eventName: string, cb: CallBack) {
    this._getHandlers(eventName).callbackStack.push(cb);
  }

  off(eventName: string) {
    if (this.handlers[eventName]) {
      delete this.handlers[eventName];
    }
  }

  emit(eventName: string) {
    this._getHandlers(eventName).callbackStack.forEach((callback) =>
      callback.call(callback)
    );
  }

  _getHandlers(eventName: string): EventItem {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = {
        callbackStack: [],
      };
    }
    return this.handlers[eventName];
  }
}

//测试：
const EventInstance = new EventBus();
EventInstance.off("click");
EventInstance.on("click", () => {
  console.log("this is click");
});
EventInstance.on("hover", () => {
  console.log("this is hover");
});
EventInstance.on("click", () => {
  console.log("this is second click");
});
EventInstance.emit("click"); //this is click  this is second click
EventInstance.emit("hover"); //this is hover
EventInstance.off("click");
EventInstance.emit("click");
