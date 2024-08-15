import { createMulterUpload } from '../templates/multer/index.js';
import { createRouter } from '../templates/router/index.js';

// Import handlers
import { BlurImageHandler } from './blurImage.js';
import { ChangeColorImageHandler } from './changeColorImage.js';
import { FaceRegonitionImageHandler } from './faceRegonition.js';
import { DatatableImageToExcelHandler } from './datatableImageToExcel.js';

const upload = createMulterUpload("../uploads/");
const base = {
  image: "/image"
};

export const ImageRouter = createRouter({
  handlers: [
    {
      path: base.image + BlurImageHandler.path,
      method: "post",
      fns: [upload.fields([{ name: "image" }]), BlurImageHandler.handler]
    },
    {
      path: base.image + ChangeColorImageHandler.path,
      method: "post",
      fns: [upload.fields([{ name: "image" }]), ChangeColorImageHandler.handler]
    },
    {
      path: base.image + FaceRegonitionImageHandler.path,
      method: "post",
      fns: [upload.fields([{ name: "image" }]), FaceRegonitionImageHandler.handler]
    },
    {
      path: base.image + DatatableImageToExcelHandler.path,
      method: "post",
      fns: [upload.fields([{ name: "image" }]), DatatableImageToExcelHandler.handler]
    }
  ]
});