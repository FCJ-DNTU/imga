// Import from components
import { BlurImage } from "../components/blur_image/BlurImage.js";
import { ChangeColorImage } from "../components/change_color_image/ChangeColorImage.js";
import { FaceRecognition } from "../components/face_recognition/FaceRecognition.js";
import { Tab } from "../components/tab/Tab.js";

// Định nghĩa hàm main
/**
	@@ -12,32 +8,13 @@ import { Tab } from "../components/tab/Tab.js";
 * @param utils 
 */
export function main(app, utils) {
  const blrimg = new BlurImage(app, utils);
  const grimg = new ChangeColorImage(app, utils);
  const freg = new FaceRecognition(app, utils);

  const tab = new Tab(app, utils,
    [
      ["blur-image", { label: "Làm mờ ảnh", element: blrimg.getRef() }],
      ["change-color-image", { label: "Chuyển đổi màu ảnh (đơn giản)", element: grimg.getRef() }],
      ["face-recognition", { label: "Nhận diện khuôn mặt", element: freg.getRef() }]
    ]
  );

  // Thêm title cho app
  app.innerHTML = `
    <header>
      <h1>Test Section</h1>
      <div>
        <p>Đây là phần test để xem hệ thống hoạt động có đúng hay không? Hỗ trợ một số tính năng như sau:</p>
        <ol>
          <li>Làm mờ ảnh</li>
          <li>Chuyển đổi ảnh màu thành ảnh trắng đen</li>
          <li>Nhận diện khuôn mặt</li>
          <li>Quét văn bản</li>
        </ol>
      </div>
    </header>`

  app.classList.add("p-5");

  // Thêm các components vào trong app
  tab.render({ title: "Chọn tính năng" });
}