import bodyParser from "body-parser";
import cors from "cors";

import { MyServer } from "./src/classes/MyServer.js";
import { ServerBuilder } from "./src/classes/ServerBuilder.js";

// Import routers
import { ImageRouter } from "./src/handlers/router.js";

const myServer = new MyServer({ port: process.env.PORT || "3000" });
const builder = new ServerBuilder({ server: myServer });

builder.buildMiddleWare(cors({ origin: "*" }));
builder.buildMiddleWare(bodyParser.json());
builder.buildMiddleWare(bodyParser.urlencoded({ extended: true }));

// Cài đặt Routes
let base = "/api";
builder.buildAPI(base, ImageRouter);

// Khởi động server.
myServer.start();