// Import from classes
import { Component } from "../../classes/Component.js";

// Import from apis
import { ImageAPIs } from "../../apis/image/index.js";

// Import from components
import { ImagePicker } from "../image_picker/ImagePicker.js";

// Import types
// import { UtilsType } from "../../utils/index.js";

export class BlurImage extends Component {
  /**
   * @param {HTMLDivElement} parent 
   * @param {UtilsType} utils 
   */
  constructor(parent, utils) {
    super(parent, utils);
  }

  _createContainer() {
    // Tạo input
    let imgpker = new ImagePicker(this.parent, this.utils);
    let strthRge = this.utils.Element.toElement(`
      <div class="mb-3">
        <label for="strength-range" class="form-label">Blur strength</label>
        <input
          type="range"
          class="form-range"
          min="1" max="20" step="1"
          id="strength-range"
          name="strength-range"
          oninput="this.nextElementSibling.value = this.value"
        >
        <output>11</output>
      </div>
    `);
    let submitBtn = `<button type="submit" class="btn btn-primary mt-3">Làm mờ</button>`;

    let imgpkerRef = imgpker.getRef();

    // Tạo output
    let guide = this.utils.Element.createElement("div", {
      className: "blur-image-guide",
      children: `
        <div>
          <h3>Hướng dẫn</h3>
          <p>Làm mờ ảnh có một thông số là Blur Strength, độ mạnh của mờ. Càng cao thì ảnh càng mờ, thông số này được giới hạn trong khoảng <strong>[1, 20]</strong>.</p>
          <ol>
            <li>Ấn vào <strong>Choose File</strong>.</li>
            <li>Chọn một tấm ảnh muốn làm mờ.</li>
            <li>Chọn độ mạnh của blur và ấn <strong>Làm mờ</strong>.</li>
            <li>Chờ Backend thực thi. Sau khi thực thi xong thì sẽ có một popup Download hiện lên, lưu ảnh vào đâu đó.</li>
            <li>Mở ảnh trong folder vừa lưu và xem kết quả.</li>
          </ol>
        </div>
      `
    });

    // Tạo form
    let form = this.utils.Element.createElement("form", {
      className: "blur-image-form",
      children: [strthRge, imgpkerRef, submitBtn],
      eventListeners: {
        "submit": function(e) {
          e.preventDefault();
          const formData = new FormData(e.target);
          const imageFile = e.target["image"].files[0];

          ImageAPIs
          .convertBlurImageAsync(formData)
          .then(res => {
            // Chuyển binary thành base64.
            const url = window.URL.createObjectURL(new Blob([res], { type: imageFile.type }));

            // Tạo một thẻ a và gán base64 vào href cho thẻ a.
            // Set thuộc tính download và tự động tải về.
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', imageFile.name);
            document.body.appendChild(link);
            link.click();
          })

          // return false;
        }
      }
    });

    // Tạo container
    let container = this.utils.Element.createElement("div", {
      className: "blur-image-container",
      children: [guide, form]
    });

    return container;
  }
}