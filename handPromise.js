class myPromise {
  constructor(callback) {
    this.status = "pending";
    this.reject = undefined;
    this.resolve = undefined;
    callback(
      (resolve) => {
        if (this.status === "pending") {
          this.resolve = resolve;
          this.status = "resolved";
        }
      },
      (reject) => {
        if (this.status === "pending") {
          this.status = "rejected";
          this.reject = reject;
        }
      }
    );
  }
  then(success, fail) {
    return new myPromise((resolve, reject) => {
      if (this.status === "resolved") {
        resolve(success(this.resolve));
      } else if (this.status === "rejected") {
        reject(fail(this.reject));
      }
    });
  }
}

Promise.newAll = (array) => {
  return new Promise((resolve, reject) => {
    const result = new Array(array.length);
    let count = 0;
    array.forEach((item, index) => {
      return Promise.resolve(item).then(
        (res) => {
          result[index] = res;
          if (++count === array.length) {
            resolve(result);
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
};

Promise.newRace = (array) => {
  return new Promise((resolve, reject) => {
    let flag = 0;
    array.forEach((item) => {
      Promise.resolve(item).then(
        (res) => {
          if (++flag === 1) resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
};

Promise.newRace([
  1,
  2,
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
    }, 2000);
  }),
  4,
]).then((data) => {
  console.log(data);
});
