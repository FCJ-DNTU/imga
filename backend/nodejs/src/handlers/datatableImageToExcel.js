import fs from 'fs';
import excel from 'excel4node';
import path from 'path';

// Import from classes
import { PyProcess } from '../classes/PyProcess.js';

import { createHandler } from '../templates/handler/index.js';

const tempFolderPath = path.resolve('../', 'temp');

export const DatatableImageToExcelHandler = createHandler(
  "/datatable_image_to_excel",
  function({ Utils }) {
    const pp = new PyProcess();
    const workbook = new excel.Workbook();
    return async function(req, res) {
      try {
        let files = req.files;
        let image = files["image"][0];
        let fileName = image.filename.split(".")[0];
        let dataSheet = workbook.addWorksheet("Data");
        let excelFileFullPath = path.resolve(tempFolderPath, fileName + ".xlsx");
        let currentRow = 1;
        let currentCol = 1;

        // Thực thi file python.
        const data = await pp.exec(
          "DatatableImageToText",
          image.path,
          req.body["language"],
          req.body["table-type"]
        );

        // Thêm dữ liệu của từng ô vào trong worksheet.
        for(let row of data.data) {
          for(let cell of row) {
            dataSheet.cell(currentCol, currentRow).string(cell);
            currentRow += 1;
          }
          currentRow = 1;
          currentCol += 1;
        }

        // Viết vào file.
        workbook.write(excelFileFullPath, function(err) {
          if(err) {
            console.log(err);
            return;
          }

          res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

          return res.download(excelFileFullPath, function(err) {          
            if(err) throw err;

            // Xóa ảnh và file.
            fs.unlink(image.path, function(err) {
              if(err) throw err;
              console.log("Image in ", image.path, " was deleted.");
            });

            fs.unlink(excelFileFullPath, function(err) {
              if(err) throw err;
              console.log("File in ", excelFileFullPath, " was deleted.");
            });
          });
        });
      } catch (error) {
        console.log("Error: ", error);
        return Utils.RM.responseJSON(
          res,
          500,
          Utils.RM.getResponseMessage(true, undefined, error.message)
        );
      }
    }
  }
);