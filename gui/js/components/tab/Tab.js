// Import from classes
import { Component } from "../../classes/Component.js";

// import { UtilsType } from "../../utils/index.js";

/**
 * @typedef RenderDataType
 * @property {string | undefined} title
 * @property
 */

/**
 * @typedef TabDataType
 * @property {string} label
 * @property {boolean} isFirst
 * @property {HTMLElement | string} element
 */

/**
 * @typedef {Array<[string, TabDataType]>} TabsDataType
 */

export class Tab extends Component {
  /**
   * @param {HTMLDivElement} parent 
   * @param {UtilsType} utils 
   * @param {TabsDataType} tabs 
   */
  constructor(parent, utils, tabs) {
    super(parent, utils);
    this.tabs = new Map(tabs);
    this.contentContainer = null;
  }

  /**
   * @param {RenderDataType} data 
   * @returns 
   */
  _createContainer(data) {
    let that = this;

    data = Object.assign({
      title: "Tabs"
    }, data);

    // Tạo title
    let titleHTML = `<h2>${data.title}</h2>`;

    let tabN = this.tabs.size;

    // Tạo tabs.
    let tabEntries = this.tabs.entries();
    let tabBtns = [];
    let index = 0;
    let firstTabName = "";

    for(let [tabName, tabData] of tabEntries) {
      let className = " btn-outline-primary";

      if(index === 0) {
        className = " btn-primary";
        firstTabName = tabName;
      };
      if(tabData.isFirst) {
        className = " btn-primary";
        firstTabName = tabName;
      };
      if(index < tabN) className += " me-2";

      let btn = that.utils.Element.createElement("button", {
        className: "btn" + className,
        textContent: tabData.label,
        eventListeners: {
          "click": function(e) {
            let _btn = e.target;
            tabBtns.forEach(tabBtn => {
              if(_btn === tabBtn) {
                tabBtn.classList.remove("btn-outline-primary");
                tabBtn.classList.add("btn-primary");
              } else {
                tabBtn.classList.remove("btn-primary");
                tabBtn.classList.add("btn-outline-primary");
              }
            });

            // Hiển thị tab
            that.showTab(tabName);
          }
        }
      });

      btn.type = "button";

      tabBtns.push(btn);
      index++;
    }

    // Tạo content container
    this.contentContainer = this.utils.Element.createElement("div", {
      className: "content-container mt-3"
    });

    // Tạo tab container.
    let tabsBtnContainer = this.utils.Element.createElement("div", {
      className: "tab-btns",
      children: tabBtns
    });

    // Tạo container.
    let container = this.utils.Element.createElement("div", {
      className: "tab mb-3",
      children: [titleHTML, tabsBtnContainer, this.contentContainer]
    });

    // Hiển thị tab đầu tiên
    this.showTab(firstTabName);

    return container;
  }

  showTab(name) {
    let element = this.tabs.get(name).element;
    
    // Xóa chilren hiện tại.
    if(this.contentContainer.children[0]) this.contentContainer.children[0].remove();

    if(typeof element === "string") {
      this.contentContainer.innerHTML = element;
      return;
    }

    this.contentContainer.append(element);
  }

  /**
   * @param {RenderDataType} data 
   * @returns 
   */
  render(data) {
    if(!this.ref) this.ref = this._createContainer(data);
    this.parent.append(this.ref);
  }
}