// Import from classes
import { Component } from "../../classes/Component.js";

// import { UtilsType } from "../../utils/index.js";

export class ImagePicker extends Component {
  /**
   * @param {HTMLDivElement} parent 
   * @param {UtilsType} utils 
   */
  constructor(parent, utils) {
    super(parent, utils);
  }

  _createContainer() {
    // Tạo input file element
    let imageFileHTML = `<input class="form-control form-control-lg" name="image" id="imageFile" type="file">`;

    let imageFile = this.utils.Element.toElement(imageFileHTML);

    // Tạo container.
    let container = this.utils.Element.createElement("div", {
      className: "image-picker",
      children: imageFile
    });

    return container;
  }
}