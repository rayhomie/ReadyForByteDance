Function.prototype.bind2 = function (ctx = globalThis, ...args1) {
  //使用symbol避免属性名冲突
  const symbol = Symbol();
  ctx[symbol] = this;
  return function (...args2) {
    const res = ctx[symbol](...args1, ...args2);
    //删除掉添加的副作用
    delete ctx[symbol];
    //返回执行结果
    return res;
  };
};

obj = { c: 2 };
function a(x, y, z) {
  console.log(this, x, y, z);
}
a.bind(obj, 1, 2)(3); //{c:2} 1 2 3
a.bind2(obj, 1, 2)(3); //{ c: 2, [Symbol()]: [Function: a] } 1 2 3
