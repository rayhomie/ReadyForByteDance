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

function postOrder(root) {}
