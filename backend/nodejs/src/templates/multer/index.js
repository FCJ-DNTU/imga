import multer from "multer";

/**
 * Dùng để tạo một middleware cho multer.
 * @param {string} destination 
 * @returns 
 */
export function createMulterUpload(destination) {
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, destination);
    },

    filename: function(req, file, cb) {
      let parts = file.originalname.split(".");
      let fileName = parts[0] + "_" + Date.now() + "." + parts[1];
      cb(null, fileName);
    }
  });

  return multer({ storage });
};