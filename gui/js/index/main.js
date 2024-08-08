// Import from components
// import { BlurImage } from "../components/blur_image/BlurImage.js";
// import { ChangeColorImage } from "../components/change_color_image/ChangeColorImage.js";
// import { FaceRecognition } from "../components/face_recognition/FaceRecognition.js";
import { ScanText } from "../components/scan_text/ScanText.js";
import { Tab } from "../components/tab/Tab.js";

// Định nghĩa hàm main
/**
 * Hàm main
 * @param {HTMLDivElement} app
 * @param utils
 */
export function main(app, utils) {
  // const blrimg = new BlurImage(app, utils);
  // const grimg = new ChangeColorImage(app, utils);
  // const freg = new FaceRecognition(app, utils);
  const scan = new ScanText(app, utils);

  // const tab = new Tab(app, utils,
  //   [
  //     ["blur-image", { label: "Làm mờ ảnh", element: blrimg.getRef() }],
  //     ["change-color-image", { label: "Chuyển đổi màu ảnh (đơn giản)", element: grimg.getRef() }],
  //     ["face-recognition", { label: "Nhận diện khuôn mặt", element: freg.getRef() }],
  //     ["scan_text",{label: "Quét văn bản",element :scan.getRef() }]
  //   ]
  // );

  // Thêm title cho app
  app.innerHTML = `
    <header>
      <h1>Chuyển đổi dữ liệu trong ảnh thành file excel</h1>
      <div class="d-flex justify-content-center">
        <img class="img-fluid" style="min-width: 280px; max-width: 1200px" src="https://github.com/user-attachments/assets/6619366a-1627-4408-99b6-d79ffcb1b27f" alt="cover" />
      </div>
      <div>
        <p>Ứng dụng chuyển đổi dữ liệu dạng bảng trong ảnh thành file excel. Chỉ cần thêm file vào trong input rồi ấn "Chuyển đổi", chờ một lát sẽ có file excel tải về.</p>
      </div>
    </header>

    <hr></hr>
  `;

  // Thêm một số thuộc tính cho app
  app.classList.add("p-5");

  // Thêm các components vào trong app
  scan.render();
}
