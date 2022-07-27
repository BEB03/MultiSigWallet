function getParamFromTx(tx, eventName, propertyName) {
  const args = tx.logs[0].args[eventName];

  if (typeof args != "object") {
    return args;
  } else if (Array.isArray(args)) {
    return args[propertyName];
  } else {
    return args.words[0];
  }
}

module.exports.getParamFromTx = getParamFromTx;
// 왜 module.exports.getParamFromTx는 되고 module.exports는 안됨??
