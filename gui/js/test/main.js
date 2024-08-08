
import { ScanText} from "../components/scan_text/Scan_text.js"

// Định nghĩa hàm main
/**
 * Hàm main
 * @param {HTMLDivElement} app 
 * @param utils 
 */
export function main(app, utils) {
  const scan = new ScanText(app, utils);
  // Thêm title cho app
  app.innerHTML = `
    <header>
      <h1>Chuyển đổi dữ liệu trong ảnh thành file excel</h1>
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