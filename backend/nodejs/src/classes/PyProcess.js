import path from "path";
import { spawn } from "child_process";

// Define global
const root = path.resolve("../");

/**
 * @typedef {keyof PyProcess.ScriptPaths} ScriptPathKeys
 */

export class PyProcess {
  static ScriptPaths = {
    BlurImage: root + "/python/blur_image.py",
    ChangeColorImage: root + "/python/change_color_image.py",
    FaceRecognition: root + "/python/face_recognition.py",
    DatatableImageToText: root + "/python/datatable_image_to_text.py",
  };

  constructor() {
    this.pythonPath = process.env.PYTHON_PATH || "python3";
  }

  /**
   * Dùng phương thức này để tạo ra một python executer.
   * @param {ScriptPathKeys} script
   * @param  {...any} args
   * @returns
   */
  exec(script, ...args) {
    // Use python3 (Linux)
    const py_process = spawn(this.pythonPath, [
      PyProcess.ScriptPaths[script],
      ...args,
    ]);

    try {
      return new Promise(function (res, rej) {
        py_process.stdout.on("data", (data) => {
          data = data.toString();
          data = JSON.parse(data);
          if (data.isDone) {
            res(data);
          } else {
            console.log(data);
          }
        });

        py_process.stderr.on("data", (data) => {
          data = data.toString();
          data = JSON.parse(data);
          console.error("PyProcess Error: ", data);
          rej({ message: "There are an error!" });
        });
      });
    } catch (error) {
      console.error("PyProcess Error: ", error);
      return Promise.resolve(false);
    }
  }
}
