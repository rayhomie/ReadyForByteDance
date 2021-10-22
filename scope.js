var a;
console.log("a: " + a); //打印全局变量a
{
  a = 1; //赋值全局变量
  function a() {} //声明函数变量
  a = 5; //给函数变量赋值
  console.log("a: " + a); //打印块内的函数变量a
}
console.log("a: " + a); //打印全局变量a

/*
a: undefined
a: 5
a: 1


函数有块作用域（被提升到块的顶级）
var变量没有块作用域
*/
