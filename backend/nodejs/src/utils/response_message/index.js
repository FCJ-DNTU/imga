/**
 * @typedef ResponseMessageType
 * @property {boolean} isError
 * @property {number | undefined} code
 * @property {any | undefined} data
 * @property {string | undefined} message
 */

/**
 * 
 * @param {boolean} isError Có lỗi hay không?
 * @param {any} data Dữ liệu trả về.
 * @param {string} message Nội dung thông báo.
 * @returns 
 */
function getResponseMessage(isError = false, data, message) {
  return {
    isError,
    data,
    message
  }
}

/**
 * @param res 
 * @param {number} status 
 * @param {ResponseMessageType} responseMessage 
 * @returns 
 */
function responseJSON(res, status, responseMessage) {
  responseMessage.code = status;
  return res.status(status).json(responseMessage);
}

export const RM = {
  /**
   * Dùng để tạo ra một ResponseMessage object.
   */
  getResponseMessage,
  /**
   * Dùng res để trả về kết quả cho người dùng ở dạng json.
   */
  responseJSON
}