var str = "window";

var test = {
  str: "test",
  a: function () {
    console.log(this.str);
  },
  b: () => {
    console.log(this.str);
  },
};

test.a(); //test
test.b(); //window
test.b.bind({ str: "xxx" })(); //window

fn = test.a;
fn1 = test.b;
fn(); //window
fn1(); //window
