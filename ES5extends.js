function parent(name) {
  this.parentName = name;
}

parent.prototype.say = function (word) {
  console.log("say: " + word);
};

function child(name) {
  parent.call(this, "name");
  this.childName = name;
}

child.prototype = Object.create(parent.prototype);
child.prototype.constructor = child; //**重要**prototype对象被重置了，需要保留原来的constructor指针指向

const par = new parent("rayhomie");
console.log(par.parentName);
par.say("hhh");

const chi = new child("leihao");
console.log(chi.childName);
console.log(chi.parentName);
chi.say("hello");
