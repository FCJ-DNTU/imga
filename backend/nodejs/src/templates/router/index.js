import { Router } from "express";

/**
 * @typedef {"get" | "post" | "put" | "delete" | "patch"} HTTPMethods
 */

/**
 * @typedef Handler
 * @property {string} path
 * @property {HTTPMethods} method
 * @property {Array<(req: Request, res: Response, next?: NextFunction) => any>} fns
 */

/**
 * @typedef CreateRouterOptions
 * @property {Array<Handler>} handlers
 */

/**
 * 
 * @param {CreateRouterOptions} options 
 * @returns 
 */
export function createRouter(options) {
  const router = Router();
  const { handlers } = options;

  for(let handler of handlers) {
    switch(handler.method) {
      case "get": {
        router.route(handler.path).get(...handler.fns);
        break;
      };

      case "post": {
        router.route(handler.path).post(...handler.fns);
        break;
      };

      case "delete": {
        router.route(handler.path).delete(...handler.fns);
        break;
      };

      case "put": {
        router.route(handler.path).put(...handler.fns);
        break;
      };

      case "patch": {
        router.route(handler.path).patch(...handler.fns);
        break;
      };
    }
  }

  return router;
}