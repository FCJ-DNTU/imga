/**
 * @param {any} o 
 * @returns 
 */
function autoBind(o) {
  let propNames = Object.getOwnPropertyNames(o);
  for(let propName of propNames) {
    if(typeof o[propName] === "function") {
      o[propName] = o[propName].bind(o);
    }
  }
  return o;
}

/**
 * @param {any} o 
 * @param {Array<string>} propNames 
 * @returns 
 */
function removeProps(o, propNames) {
  for(let propName of propNames) {
    if(o[propName]) delete o[propName];
  }
  return o;
}

export const _Object_ = {
  /**
   * Dùng để bind object với các prototype methods.
   */
  autoBind,
  /**
   * Dùng để xóa một thuộc tính nào đó của object.
   */
  removeProps
}