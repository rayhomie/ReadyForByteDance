function preOrder(root) {
  const res = [];
  if (!root) return res;
  function handle(node) {
    res.push(node.val);
    if (node.left) {
      handle(node.left);
    }
    if (node.right) {
      handle(node.right);
    }
  }
  handle(root);
  return res;
}

function preOrderStack(root) {
  const res = [];
  if (!root) return res;
  const stack = [];
  stack.push(root);
  while (stack.length > 0) {
    const cur = stack.pop();
    res.push(cur.val);
    if (cur.right) {
      stack.push(cur.right);
    }
    if (cur.left) {
      stack.push(cur.left);
    }
  }
  return res;
}

function inOrder(root) {
  const res = [];
  if (!root) return res;
  function handle(node) {
    if (node.left) {
      handle(node.left);
    }
    res.push(node.val);
    if (node.right) {
      handle(node.right);
    }
  }
  handle(root);
  return res;
}

//将左叶子全部压入栈
function inOrderStack(root) {
  const res = [];
  if (!root) return res;
  const stack = [];
  let tem = root;
  while (tem) {
    stack.push(tem);
    tem = tem.left;
  }
  while (stack.length > 0) {
    const cur = stack.pop();
    res.push(cur.val);
    if (cur.right) {
      let tem2 = cur.right;
      while (tem2) {
        stack.push(tem2);
        tem2 = tem2.left;
      }
    }
  }
  return res;
}

function postOrder(root) {
  const res = [];
  if (!root) return res;
  function handle(node) {
    if (node.left) {
      handle(node.left);
    }
    if (node.right) {
      handle(node.right);
    }
    res.push(node.val);
  }
  handle(root);
  return res;
}

//将左叶子全部压入栈
function postOrderStack(root) {
  const res = [];
  if (!root) return res;
  let stack = [];
  let temp = root;
  while (temp) {
    //将左叶子全部压入栈
    stack.push(temp);
    temp = temp.left;
  }
  let prev = null; //用于记录上一次的弹出节点
  while (stack.length > 0) {
    const top = stack[stack.length - 1];
    if (!top.right || (top.right && prev === top.right)) {
      /*如果当前节点没有右叶子 
        或者
        如果上一次弹出的节点 和 当前的右叶子地址相同，则记录结果（最先进入的右叶子也需要结束）*/
      prev = stack.pop();
      res.push(top.val);
    } else {
      //否则将所有左叶子压入
      let temp2 = top.right;
      while (temp2 !== null) {
        stack.push(temp2);
        temp2 = temp2.left;
      }
    }
  }
  return res;
}

//层序遍历递归，就是用前序遍历这是多传可一个结果存放时的索引的参数
function levelOrder(root) {
  const arr = [];
  function loop(node, h) {
    if (!node) return;
    if (!arr[h]) arr[h] = [];
    arr[h].push(node.val);

    loop(node.left, h + 1);
    loop(node.right, h + 1);
  }
  loop(root, 0);
  return arr;
}

function levelOrderQueue(root) {
  const res = [];
  if (!root) return res;
  const queue = [];
  queue.push(root);
  while (queue.length > 0) {
    const curRes = [];
    const n = queue.length; //**queue的长度在变化，需要进入下一层时写死
    for (let i = 0; i < n; i++) {
      const cur = queue.shift();
      curRes.push(cur.val);
      if (cur.left) {
        queue.push(cur.left);
      }
      if (cur.right) {
        queue.push(cur.right);
      }
    }
    res.push(curRes);
  }
  return res;
}
