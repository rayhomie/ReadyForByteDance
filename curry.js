/*
function sum(a, b, c) {
    console.log(a + b + c);
}
const fn = curry(sum);
fn(1, 2, 3); // 6
fn(1, 2)(3); // 6
fn(1)(2, 3); // 6
fn(1)(2)(3); // 6
*/

//使用调用静态方法的形式来结束
function curry1(callback) {
  const params = [];
  return function handle(...args) {
    params.push(...args);
    handle.toString = function () {
      callback(...params);
    };
    return handle;
  };
}

//根据传入传入参数来结束
function curry2(callback) {
  const params = [];
  return function handle(...args) {
    params.push(...args);
    if (callback.length === params.length) {
      //参数收集够了则调用函数
      callback(...params);
    }
    return handle;
  };
}

//test
function sum(a, b, c) {
  console.log(a + b + c);
}
const fn1 = curry1(sum);
fn1(1, 2)(3)(4, 5).toString(); // 6

const fn2 = curry2(sum);
fn2(1, 2)(3)(4, 5); // 6
