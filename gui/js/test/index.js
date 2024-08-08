import { Utils } from "../utils/index.js";

// Import main function
import { main } from "./main.js";

// Say hello!!!
console.log("Hello world");

// Thêm một hàm lắng nghe sự kiện `DOMContentLoaded`. Khi content của web được tải xong,
// Thì hàm này sẽ được thực thi.
document.addEventListener("DOMContentLoaded", () => {
  // Lấy ref của div#app
  const app = document.getElementById("app");
  main(app, Utils)
});