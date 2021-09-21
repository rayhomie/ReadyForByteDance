function unique(array) {
  const obj = {};
  const res = [];
  let count = 0;
  for (let item of array) {
    if (!obj[item]) {
      res[count] = item;
      count++;
    }
    obj[item] = true;
  }
  return res;
}

const arr = [1, 1, 1, 3, 4, 1, 2, 4];

console.log(unique(arr));
