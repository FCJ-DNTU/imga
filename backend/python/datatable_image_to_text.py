# Nhớ cài pytesseract với lệnh pip install pytesseract
# Cài luôn file tesseract: https://digi.bib.uni-mannheim.de/tesseract/tesseract-ocr-w64-setup-5.3.3.20231005.exe
# Thêm một số thư viện bắt buộc
import cv2
import pytesseract
import sys
import numpy as np

# Sử dụng sys để add utils vào mới có thể dùng module bên ngoài.
# sys.path.append('d:/Hoctap/Computer Vision/source')
sys.path.append('./')

from definitions import get_path, TableType
from modules.imgpreprocessing import image_preprocess, crop_image, find_table_bboxes, convert_to_binary, adjust_size_of_image
from modules.characterslocalization import characters_localize
from modules.myres import get_message

# Khai báo một số đường dẫn mặc định trong thư mục test.
builds_path = get_path("builds")

# Gán đường dẫn tới file `tesseract.exe` vừa mới cài đặt ở bước trước vào đây.
pytesseract.pytesseract.tesseract_cmd = builds_path + "/tesseract/tesseract.exe"

# Định nghĩa hàm main
def main():
  try:
    # KHAI BÁO BIẾN
    images_path = sys.argv[1]
    used_lang = sys.argv[2]
    table_type = int(sys.argv[3])
    
    if table_type == 1:
      table_type = TableType.NORMAL
    elif table_type == 2:
      table_type = TableType.ONLY_HORIZONTAL_LINES
    elif table_type == 3:
      table_type = TableType.ONLY_VERTICAL_LINES
    elif table_type == 4:
      table_type = TableType.ONLY_COVERED_BORDERS
    
    # Đọc ảnh cần trích xuất chữ
    img = cv2.imread(images_path)
    copy_of_img = img.copy()
    
    # cv2.imshow("Original", img)
    # cv2.waitKey(0)

    # Tiến hành giai đoạn 1: Tiền xử lý ảnh
    binary_img, inverted_binary_img, img_shape = convert_to_binary(img)

    # Định vị trí của table
    table_bbox, bboxes, heights = find_table_bboxes(binary_img, img_shape, table_type)
    
    # Lấy ra các thông tin của bounding box của table.
    x, y, wTable, hTable = table_bbox

    # Cắt lấy ảnh table
    table = crop_image(img, x, y, wTable, hTable)
    
    # cv2.imshow("Table", table)
    # cv2.waitKey(0)

    # Thay đổi lại kích thước của image table.
    table = adjust_size_of_image(table, (wTable, hTable))
    table = cv2.erode(table, (3, 3), iterations = 2)

    binary_img, inverted_binary_img, img_shape = image_preprocess(table, table_type)

    cnts, bboxes = characters_localize(binary_img, table_type)

    # Sắp xếp lại thứ tự của mảng
    bboxes = bboxes[::-1]
    previous = bboxes[0][3]

    # Khai báo một biến để lưu kết quả.
    rect = None
    index = 0
    cols = []
    row = []
    N = len(bboxes)

    # Với mỗi contour được xác định, thì mình sẽ lấy ra các bounding box tương ứng.
    # Các tọa độ này sẽ được dùng để cắt ra các ảnh con chứa ảnh.
    for bbox in bboxes:
      # Tìm bounding box gồm tọa độ x, y, chiều rộng w và chiều cao h.
      x, y, w, h = bbox
    
      # Nếu như height của một box mà lớn hơn mean of height, thì loại box đó ra
      if h >= hTable:
        N = N - 1
        continue
    
      if y > previous:
        previous = y + h
        cols.append(row)
        row = []
      
      if index >= N - 1:
        cols.append(row)
      
      # Vẽ một hình chữ nhật màu xanh lá để cho trực quan (không ảnh hưởng)
      rect = cv2.rectangle(table, (x, y), (x + w, y + h), (0, 255, 0), 2)
      
      # Cắt ảnh
      cropped = crop_image(inverted_binary_img, x, y, w, h)
      
      # Apply OCR on the cropped image
      predict = pytesseract.image_to_string(cropped, config='--psm 6', lang = used_lang)
      row.append(predict)
      index = index + 1

    m = get_message("Extract text from DataTable Done", data = cols, isDone = 1)
    print(m)
    sys.stdout.flush()
  except Exception as e:
    errm = get_message(str(e), isError = 1)
    print(errm)
    
# Chạy hàm main
main()