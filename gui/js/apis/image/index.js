import { API_ROOT } from '../index.js';

const path = API_ROOT + "/image";

/**
 * Dùng api caller này để convert một tấm ảnh thành ảnh mờ.
 * @param {FormData} data 
 * @returns 
 */
async function convertBlurImageAsync(data) {
  const response = await fetch(
    path + "/blur_image",
    {
      method: "post",
      body: data
    }
  );

  // Vì trả về là ảnh, không phải là object message, nên không convert thành json.
  return response.arrayBuffer();
}

/**
 * Dùng api caller này để convert hệ màu của ảnh.
 * @param {FormData} data 
 * @returns 
 */
async function convertColorImageAsync(data) {
  const response = await fetch(
    path + "/change_color_image",
    {
      method: "post",
      body: data
    }
  );

  // Vì trả về là ảnh, không phải là object message, nên không convert thành json.
  return response.arrayBuffer();
}

/**
 * Dùng api caller này để nhận diện khuôn mặt trong ảnh.
 * @param {FormData} data 
 * @returns 
 */
async function recognizeFaceInImageAsync(data) {
  const response = await fetch(
    path + "/face_recognition_image",
    {
      method: "post",
      body: data
    }
  );

  // Vì trả về là ảnh, không phải là object message, nên không convert thành json.
  return response.arrayBuffer();
}

/**
 * Dùng api caller này để dùng tính năng chính trong app. Tính năng trích xuất văn bản trong table thành
 * file excel.
 * @param {FormData} data 
 * @returns 
 */
async function extractDataFromDTInImageAsync(data) {
  const response = await fetch(
    path + "/datatable_image_to_excel",
    {
      method: "post",
      body: data
    }
  );

  // Vì trả về là ảnh, không phải là object message, nên không convert thành json.
  return response.arrayBuffer();
}

export const ImageAPIs = {
  convertBlurImageAsync,
  convertColorImageAsync,
  recognizeFaceInImageAsync,
  extractDataFromDTInImageAsync
};