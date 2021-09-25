Function.prototype.call2 = function (ctx = globalThis, ...args) {
  //使用symbol避免属性名冲突
  const symbol = Symbol();
  ctx[symbol] = this;
  const res = ctx[symbol](...args);
  //删除掉添加的副作用
  delete ctx[symbol];
  //返回执行结果
  return res;
};

obj = { c: 2 };
function a(x, y, z) {
  console.log(this, x, y, z);
}

a.call(obj);
a.call2(obj);
