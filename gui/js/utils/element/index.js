/**
 * @typedef CreateElementOptions
 * @property {string | undefined} className
 * @property {string | undefined} id
 * @property {HTMLElement | string | undefined} children
 * @property {string | undefined} textContent
 * @property {any} style
 * @property {{[key in keyof HTMLElementEventMap]: (e: any) => void} | undefined} eventListeners
 */

/**
 * @param {string} html
 * @returns 
 */
function toElement(html) {
  let div = document.createElement("div");
  div.innerHTML = html;
  return div.children[0];
}

/**
 * @param {HTMLElement} element 
 * @param {Array<any> | HTMLElement | string} children 
 * @param {string | undefined} textContent
 * @returns 
 */
function append(element, children, textContent) {
  if(!children && textContent) {
    element.textContent = textContent;
    return element;
  };

  if(Array.isArray(children)) {
    for(let child of children) {
      append(element, child);
    }

    return element;
  }

  if(typeof children === "string") element.append(toElement(children));
  else element.append(children);

  return element;
}

/**
 * @param {keyof HTMLElementTagNameMap} type
 * @param {CreateElementOptions | undefined} options
 * @returns 
 */
function createElement(type, options) {
  let element = document.createElement(type);

  if(options) {
    if(options.className) element.classList.add(...options.className.split(" "));
    if(options.id) element.id = options.id;
    if(options.children) append(element, options.children);
    if(options.textContent) append(element, undefined, options.textContent);
    if(options.style) {
      let _style = options.style;
      for(let key in _style) if(_style[key] !== undefined || _style[key] !== null) element.style[key] = _style[key];
    };
    if(options.eventListeners) {
      for(let key in options.eventListeners) {
        element.addEventListener(key, options.eventListeners[key]);
      }
    };
  }

  return element;
}

export const _Element_ = {
  /**
   * Phương thức này sẽ chuyển chuỗi html sang một HTMLElement. 
   */
  toElement,
  /**
   * Phương thức này dùng để build một HTMLElement.
   */
  createElement,
  /**
   * Phương thức này dùng để thêm một content vào trong HTMLElement.
   */
  append
};