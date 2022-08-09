function getParamFromTx(tx, eventName, propertyName) {
  const args = tx.logs[0].args[eventName];

  if (typeof args !== 'object') {
    return args;
  }
  if (Array.isArray(args)) {
    return args[propertyName];
  }
  return args.words[0];
}

async function tryCatch(test) {
  try {
    await test();
  } catch (error) {
    assert(error, 'Expected an error but did not get one');
    assert(
      error.message.startsWith('Returned error: VM'),
      `got${error.message}instead`
    );
  }
}

Object.assign(module.exports, {
  getParamFromTx,
  tryCatch,
});
