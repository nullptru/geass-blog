export const throttle = (waitTime, method) => {
  // store the previous invoke time
  let pre = new Date().getTime();
  return () => {
    const now = new Date().getTime();
    // if now - waitTime > pre, it means function could be invoke
    if (now - pre > waitTime) {
      method();
      pre = now;
    }
  };
};

export const isObjEqual = (obj1, obj2) => {
  if (obj1.constructor.name !== 'Object' || obj1.constructor.name !== 'Object') {
    throw new Error('params is not plain object');
  }
  if ((obj1 === undefined && obj2 !== undefined)
  || (obj1 !== undefined && obj2 === undefined)) return false;
  if (obj2 === undefined && obj2 === undefined) return true;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if ((obj1[key] === undefined && obj2[key] !== undefined)
    || (obj1[key] !== undefined && obj2[key] === undefined)
    || (obj1[key].toString() !== obj2[key].toString())) {
      return false;
    }
  }
  return true;
};
