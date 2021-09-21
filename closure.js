for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

//1.let
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

//2.IIFE
for (var i = 0; i < 5; i++) {
  (function (param) {
    setTimeout(function () {
      console.log(param);
    }, 1000);
  })(i);
}

//3.setTimeout（third param）
for (var i = 0; i < 5; i++) {
  setTimeout(
    function () {
      console.log(arguments[0]);
    },
    1000,
    i
  );
}
