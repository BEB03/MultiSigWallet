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

module.exports.tryCatch = async function (test, errType) {
  try {
    await test();
  } catch (error) {
    assert(error, "Expected an error but did not get one");
    assert(
      error.message.startsWith("Returned error: VM"),
      "got" + error.message + "instead"
    );
  }
};

module.exports.getParamFromTx = getParamFromTx;
// module.exports.tryCatch = tryCatch;
// 왜 module.exports.getParamFromTx는 되고 module.exports는 안됨??
