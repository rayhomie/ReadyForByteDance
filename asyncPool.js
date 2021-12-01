//https://mp.weixin.qq.com/s?__biz=MzI2MjcxNTQ0Nw==&mid=2247490704&idx=1&sn=18976b9c9fe2456172c394f1d9cae88b&scene=21#wechat_redirect

//ES7
async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = []; // 保存所有结果的数组
  const executing = []; // 存储正在执行的异步任务
  for (const item of array) {
    // 调用iteratorFn函数执行异步任务
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p); // 保存该任务的结果

    // 当poolLimit值小于或等于总任务个数时，进行并发控制
    if (poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务（then后后面的回调只是注册，调用是在当前任务p执行结束后）
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e); // 保存正在执行的异步任务
      if (executing.length >= poolLimit) {
        // 当前正在执行的任务数组长度超了就需要等待
        await Promise.race(executing); // 等待较快的任务执行完成
      }
    }
  }
  return Promise.all(ret); // 获取有序的结果
}
/*
充分利用了 Promise.all 和 Promise.race 函数特点，再结合 ES7 中提供的 async await 特性，最终实现了并发控制的功能。
利用 await Promise.race(executing); 这行语句，我们会等待 正在执行任务列表 中较快的任务执行完成之后，才会继续执行下一次循环。
*/

const timeout = (i) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(i);
      resolve(i);
    }, i)
  );
asyncPool(2, [1000, 5000, 3000, 2000], timeout);

//ES6
function asyncPoolEs6(poolLimit, array, iteratorFn) {
  let i = 0;
  const ret = []; // 存储所有的异步任务
  const executing = []; // 存储正在执行的异步任务
  const enqueue = function () {
    if (i === array.length) {
      return Promise.resolve();
    }
    const item = array[i++]; // 获取新的任务项
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p);

    let r = Promise.resolve();

    // 当poolLimit值小于或等于总任务个数时，进行并发控制
    if (poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        r = Promise.race(executing);
      }
    }

    // 正在执行任务列表 中较快的任务执行完成之后，才会从array数组中获取新的待办任务
    return r.then(() => enqueue());
  };
  return enqueue().then(() => Promise.all(ret));
}
