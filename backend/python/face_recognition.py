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
    scale = float(sys.argv[2])
    min = int(sys.argv[3])

    # Thêm ảnh
    mi.add_image(imgPath)
    
    # Thự hiện nhận diện khuôn mặt
    result = mi.detect_face_cc(scaleFactor =  scale, minNeighbors = min)

    # Ghi ảnh mới
    cv2.imwrite(imgPath, result)

    # Tạo message
    m = get_message("Face recognition done", isDone = 1)
    
    # Trả về thông báo kết quả
    print(m)
    sys.stdout.flush()
  except Exception as e:
    errm = get_message(str(e), isError = 1)
    print(errm)
    
# Chạy hàm main
main()