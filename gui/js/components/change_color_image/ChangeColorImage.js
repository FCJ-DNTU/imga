// Import from classes
import { Component } from "../../classes/Component.js";

// Import from apis
import { ImageAPIs } from "../../apis/image/index.js";

// Import from components
import { ImagePicker } from "../image_picker/ImagePicker.js";

// Import types
// import { UtilsType } from "../../utils/index.js";

export class ChangeColorImage extends Component {
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
    let select = this.utils.Element.toElement(`
      <div class="mb-3">
        <select class="form-select" name="color" aria-label="Default select example">
        <option selected>Hệ màu</option>
        <option value="gray">GRAY</option>
        <option value="hsv">HSV</option>
        <option value="hls">HLS</option>
        <option value="lab">LAB</option>
      </select>
      </div>
    `);
    let submitBtn = `<button type="submit" class="btn btn-primary mt-3">Đổi màu</button>`;

    let imgpkerRef = imgpker.getRef();

    // Tạo output
    let guide = this.utils.Element.createElement("div", {
      className: "blur-image-guide",
      children: `
        <div>
          <h3>Hướng dẫn</h3>
          <p>Đổi màu ảnh đơn giản, chọn một select bên dưới để chọn một hệ màu khác.</p>
          <ol>
            <li>Ấn vào <strong>Choose File</strong>.</li>
            <li>Chọn một tấm ảnh muốn đổi màu.</li>
            <li>Chọn hệ màu muốn đối và ấn <strong>Đổi màu</strong>.</li>
            <li>Chờ Backend thực thi. Sau khi thực thi xong thì sẽ có một popup Download hiện lên, lưu ảnh vào đâu đó.</li>
            <li>Mở ảnh trong folder vừa lưu và xem kết quả.</li>
          </ol>
        </div>
      `
    });

    // Tạo form
    let form = this.utils.Element.createElement("form", {
      className: "blur-image-form",
      children: [select, imgpkerRef, submitBtn],
      eventListeners: {
        "submit": function(e) {
          e.preventDefault();
          const formData = new FormData(e.target);
          const imageFile = e.target["image"].files[0];

          ImageAPIs
          .convertColorImageAsync(formData)
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