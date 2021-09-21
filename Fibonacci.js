//零优化
function fibonacci(n) {
  if (n < 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

//尾递归(次数, 前一位的值, 后一位的值-结果)
function fibonacci(n, f0 = 0, f1 = 1) {
  if (n === 0) {
    return f1;
  }
  return fibonacci(n - 1, f1, f1 + f0);
}

//非递归，动态规划
function fibonacci(n) {
  const arr = [1, 2];
  for (let i = 0; i < n; i++) {
    if (i >= 2) {
      arr[i] = arr[i - 1] + arr[i - 2];
    }
  }
  return arr[n - 1];
}

console.log(fibonacci(6));
