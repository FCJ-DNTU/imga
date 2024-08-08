// Import from classes
import { Component } from "../../classes/Component.js";

// Import from apis
import { ImageAPIs } from "../../apis/image/index.js";

// Import from components
import { ImagePicker } from "../image_picker/ImagePicker.js";

// Import types
// import { UtilsType } from "../../utils/index.js";

export class FaceRecognition extends Component {
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
    let ScaleRge = this.utils.Element.toElement(`
      <div class="mb-3">
        <label for="scale-factor" class="form-label">Scale Factor</label>
        <input
          type="range"
          class="form-range"
          min="1.1" max="2" step="0.1"
          id="scale-factor"
          name="scale-factor"
          oninput="this.nextElementSibling.value = this.value"
        >
        <output>1.6</output>
      </div>
    `);

    let neiRge = this.utils.Element.toElement(`
    <div class="mb-3">
      <label for="min-neighboors" class="form-label">Min Neighboors</label>
      <input
        type="range"
        class="form-range"
        min="1" max="10" step="1"
        id="min-neighboors"
        name="min-neighboors"
        oninput="this.nextElementSibling.value = this.value"
      >
      <output>6</output>
    </div>
  `);

    let submitBtn = `<button type="submit" class="btn btn-primary mt-3">Nhận diện</button>`;

    let imgpkerRef = imgpker.getRef();

    // Tạo output
    let guide = this.utils.Element.createElement("div", {
      className: "blur-image-guide",
      children: `
        <div>
          <h3>Hướng dẫn</h3>
          <p>Nhận diện khuôn mặt với thuật toán haarcascade (OpenCV)</p>
          <ol>
            <li>Ấn vào <strong>Choose File</strong>.</li>
            <li>Chọn một tấm ảnh có mặt người.</li>
            <li>Điều chỉnh Scale Factor và Min Neighbors sau đó ấn <strong>Nhận diện</strong>.</li>
            <li>Chờ Backend thực thi. Sau khi thực thi xong thì sẽ có một popup Download hiện lên, lưu ảnh vào đâu đó.</li>
            <li>Mở ảnh trong folder vừa lưu và xem kết quả.</li>
          </ol>
        </div>
      `
    });

    // Tạo form
    let form = this.utils.Element.createElement("form", {
      className: "blur-image-form",
      children: [ScaleRge, neiRge, imgpkerRef, submitBtn],
      eventListeners: {
        "submit": function(e) {
          e.preventDefault();
          const formData = new FormData(e.target);
          const imageFile = e.target["image"].files[0];

          ImageAPIs
          .recognizeFaceInImageAsync(formData)
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