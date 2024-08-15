import { Utils } from "../../utils/index.js";
/**
 * This template use to create API Handlers. It receive a call back, this callback receive some
 * global objects in an `object` like:
 * - `DBs`: a list of Databases are set up. Use to communicate with Database.
 * - `utils`: a list of helper functions are used to do some actions.
 * - `services`: a list of services.
 * 
 * Will be updated in future.
 * 
 * Return a api handler.
 * @param cb 
 * @returns 
 * @example
 * ```
 * // somemw.ts
 * import { createHandler } from "templates/handler";
 * 
 * const SomeMWHandler = createHandler(
 *   "",
 *   ({ DBs, Utils }) => {
 *     return async function(req, res) {
 *       // Do here
 *     }
 *   }
 * );
 * 
 * // somerouter.ts
 * import SomeMWHandler from "middlewares/somemw";
 * 
 * const SomeRouter = createRouter({
 *   handlers: [
 *     {
 *       path: base.url + SomeHandler.path,
 *       method: "post",
 *       fns: [somemw.handler, SomeHandler.handler]
 *     }
 *   ]
 * });
 * ```
 */
export function createHandler(path, cb) {
  // Declare props for call back.
  const callBackProps = {
    Utils: Utils
  };

  return {
    path,
    handler: cb(callBackProps)
  }
}

/**
 * Use to create a handler. It receive a call back, this callback receive some
 * global objects in an `object` like:
 * - `DBs`: a list of Databases are set up. Use to communicate with Database.
 * - `utils`: a list of helper functions are used to do some actions.
 * - `services`: a list of services.
 * 
 * Have extra arguments by wrap the handler inside a function, this function receive arguments.
 * 
 * Will be updated in future.
 * 
 * Its return a function that it returns a api handler, because of extra args, you need to call and pass args to it.
 * @param path 
 * @param cb 
 * @returns
 * @example
 * ```
 * // somemw.ts
 * import { createExtraArgsHandler } from "templates/handler";
 * 
 * const SomeMWExtraArgsHandler = createExtraArgsHandler<{ scope: string }>(
 *   "",
 *   (_, args) => {
 *     return async function(req, res) {
 *       // Do here
 *       console.log(args.scope);
 *       console.log(_) // Output: { DBs [Object object], Utils: [Object object], Services: [Object object] };
 *     }
 *   }
 * );
 * 
 * // somerouter.ts
 * import SomeMWExtraArgsHandler from "middlewares/somemw";
 * 
 * const SomeRouter = createRouter({
 *   handlers: [
 *     {
 *       path: base.url + SomeHandler.path,
 *       method: "post",
 *       fns: [SomeMWExtraArgsHandler.handler({ scope: "admin" }), SomeHandler.handler]
 *     }
 *   ]
 * });
 * ```
 */
export function createExtraArgsHandler(path, cb) {
  // Declare props for call back.
  const callBackProps = {
    Utils: Utils
  };

  return {
    path,
    handler: function(args) { return cb(callBackProps, args); }
  }
}