import cv2
import sys
import json

# Sử dụng sys để add utils vào mới có thể dùng module bên ngoài.
# sys.path.append('d:/Hoctap/Computer Vision/source')
sys.path.append('./')

from modules.myimage import MyImage
from modules.myres import get_message

# Tạo instance của MyImage
mi = MyImage()

COLORS = {
  "gray": cv2.COLOR_RGB2GRAY,
  "hsv": cv2.COLOR_BGR2HSV,
  "hls": cv2.COLOR_BGR2HLS,
  "lab": cv2.COLOR_BGR2LAB
}

# Định nghĩa hàm main
def main():
  try:
    # Lấy các tham số cần thiết
    imgPath = sys.argv[1]
    color = sys.argv[2]

    # Thêm ảnh
    mi.add_image(imgPath, COLORS[color])

    # Ghi ảnh mới
    cv2.imwrite(imgPath, mi.show_image(color = COLORS[color]))

    # Tạo message
    m = get_message("Change color image done", isDone = 1)
    
    # Trả về thông báo kết quả
    print(m)
    sys.stdout.flush()
  except Exception as e:
    errm = get_message(str(e), isError = 1)
    print(errm)
    
# Chạy hàm main
main()