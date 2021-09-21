//实现 repeat(console.log, 4, 3000)
function repeat(cb, count = 0, delay) {
  if (count === 0) return;
  setTimeout(() => {
    cb();
    repeat(cb, --count, delay);
  }, delay);
}

function repeat(cb, count = 0, delay) {
  var timer = setInterval(() => {
    cb();
    if (--count === 0) clearInterval(timer);
  }, delay);
}

repeat(() => console.log("执行"), 4, 1000);
