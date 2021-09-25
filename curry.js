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

function curry(callback) {
  const params = [];
  return function handle(...args) {
    params.push(...args);
    handle.toString = function () {
      callback(...params);
    };
    return handle;
  };
}
function sum(a, b, c) {
  console.log(a + b + c);
}
const fn = curry(sum);
fn(1, 2, 3).toString(); // 6
// fn(1, 2)(3)(4, 5).toString(); // 6
