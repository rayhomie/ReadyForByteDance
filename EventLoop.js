async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2 start");
  return new Promise((resolve, reject) => {
    resolve();
    console.log("async2 promise");
  });
}
console.log("script start");
setTimeout(function () {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function (resolve) {
  console.log("promise1");
  resolve();
})
  .then(function () {
    console.log("promise2");
  })
  .then(function () {
    console.log("promise3");
  });
console.log("script end");

/*理解输出：            实际输出：
script start           script start
async1 start           async1 start   
async2 start           async2 start
async2 promise         async2 promise
promise1               promise1
script end             script end
async1 end     ---     promise2
promise2       ---     promise3
promise3       ---     async1 end
setTimeout             setTimeout

出现差异的原因，并行执行Promise导致
*/
