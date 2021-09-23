Function.prototype.apply2 = function (ctx = globalThis, argArr) {
  const symbol = Symbol();
  ctx[symbol] = this;
  const res = ctx[symbol](...argArr);
  delete ctx[symbol];
  return res;
};

obj = { c: 2 };
function a(x, y, z) {
  console.log(this, x, y, z);
}

a.apply(obj, [1, 2, 3]);
a.apply2(obj, [1, 2, 3]);
