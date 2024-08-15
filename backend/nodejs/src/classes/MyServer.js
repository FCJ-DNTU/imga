import http from "http";
import express from "express";

import { Utils } from "../utils/index.js";

export class MyServer {
  constructor(options) {
    this.port = options.port;
    this.app = express();
    this.instance = http.createServer(this.app);
    this.apis = [];
    this.middleWares = [];
  }

  start() {
    // Cài tất cả các middlewares vào trong this.app
    for (let middleWare of this.middleWares) {
      this.app.use(middleWare);
    }

    // Cài tất cả các apis trong this.apis vào trong this.app
    for (let api of this.apis) {
      this.app.use(api.base, api.router);
    }

    // Cài một "greeting api".
    this.app.get("/", function (req, res) {
      try {
        let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
        console.log("URL:", fullUrl);

        return Utils.RM.responseJSON(
          res,
          200,
          Utils.RM.getResponseMessage(false, undefined, {
            message:
              "Welcome to IDT Server. You can have perfect experience in here.",
            requestURL: fullUrl,
          })
        );
      } catch (error) {
        return Utils.RM.responseJSON(
          res,
          500,
          Utils.RM.getResponseMessage(true, undefined, error.message)
        );
      }
    });

    if (this.apis.length === 0)
      console.warn(
        "There aren't APIs in your server. Please add more APIs before start server."
      );

    this.instance.listen(this.port, "0.0.0.0", () => {
      console.log(`You're server is running on http://localhost:${this.port}`);
    });
  }
}
