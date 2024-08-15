export class ServerBuilder {
  constructor(options) {
    this.server = options.server;
  }

  /**
   * Use to build middleWares.
   * @param middleWare 
   */
  buildMiddleWare(middleWare) {
    this.server.middleWares.push(middleWare);
  }

  /**
   * Use to build API in router object.
   * @param {string} base 
   * @param {epxress.Router} router 
   */
  buildAPI(base, router) {
    this.server.apis.push({ base, router });
  }
}