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
