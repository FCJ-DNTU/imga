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

# Định nghĩa hàm main
def main():
  try:
    # Lấy các tham số cần thiết
    imgPath = sys.argv[1]
    strength = int(sys.argv[2])

    # Thêm ảnh
    mi.add_image(imgPath)

    # Tiến hành làm mờ ảnh
    blurred_image = mi.show_blur(x=strength)

    # Ghi ảnh mới
    cv2.imwrite(imgPath, blurred_image)

    # Tạo message
    m = get_message("Blur image done", isDone = 1)
    
    # Trả về thông báo kết quả
    print(m)
    sys.stdout.flush()
  except Exception as e:
    errm = get_message(str(e), isError = 1)
    print(errm)
    
# Chạy hàm main
main()