export class Component {
  /**
   * @param {HTMLDivElement} parent 
   * @param {UtilsType} utils 
   */
  constructor(parent, utils) {
    /**
     * @type {HTMLDivElement}
     */
    this.parent = parent;
    /**
     * @type {UtilsType}
     */
    this.utils = utils;
    this.ref = null;
  }

  _createContainer() {}

  getRef() {
    if(!this.ref) this.ref = this._createContainer();
    return this.ref;
  }

  render() {
    if(!this.ref) this.ref = this._createContainer();
    this.parent.append(this.ref);
  }
}