/**
 * @param {number} max 
 * @param {number} min 
 * @returns 
 */
function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @param {number} n 
 * @param {number} dec 
 * @returns 
 */
function round(n, dec) {
  let _ = Math.pow(10, dec);
  return Math.round(n * _) / _;
};

export const _Number_ = {
  /**
   * Dùng để tạo một số bất kì trong khoảng `min` tới `max`
   */
  getRandomNumber,
  /**
   * Dùng để làm tròn đến số thập phân thứ `dec` nào đó.
   */
  round
};