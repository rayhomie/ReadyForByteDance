var x = 1;
{
  //var没有块级作用域
  var x = 2;
}
console.log(x);

var y = 1;
{
  //var没有块级作用域
  let y = 2;
}
console.log(y);
