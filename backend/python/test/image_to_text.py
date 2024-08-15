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

from python.definitions import get_path, TableType
from python.modules.imgpreprocessing import image_preprocess, crop_image, find_table_bboxes, convert_to_binary, adjust_size_of_image
from python.modules.characterslocalization import characters_localize

# KHAI BÁO BIẾN
# Khai báo một số đường dẫn mặc định trong thư mục test.
out_path = get_path("test/out")
images_path = get_path("test/images")
builds_path = get_path("builds")
# File out ở đây, nếu muốn tên file khác thì sửa ở dưới
outputtxt_path = get_path(out_path, "recognized.txt")
# Biến khác
used_lang = "eng"
table_type = TableType.NORMAL

# Gán đường dẫn tới file `tesseract.exe` vừa mới cài đặt ở bước trước vào đây.
pytesseract.pytesseract.tesseract_cmd = builds_path + "/tesseract/tesseract.exe"

# In một số thông tin
print("Languages that Tesseract OCR supports: ", pytesseract.get_languages())

# Đọc ảnh cần trích xuất chữ
img = cv2.imread(images_path + "/datatable03.png")
copy_of_img = img.copy()

# Tiến hành giai đoạn 1: Tiền xử lý ảnh
binary_img, inverted_binary_img, img_shape = convert_to_binary(img)

# Định vị trí của table
table_bbox, bboxes, heights = find_table_bboxes(binary_img, img_shape, table_type)

print("Table BBox: ", table_bbox)

# Lấy ra các thông tin của bounding box của table.
x, y, wTable, hTable = table_bbox

# Cắt lấy ảnh table
table = crop_image(img, x, y, wTable, hTable)

# Thay đổi lại kích thước của image table.
# if table_type == TableType.ONLY_VERTICAL_LINES or table_type == TableType.ONLY_HORIZONTAL_LINES:
table = adjust_size_of_image(table, (wTable, hTable))
table = cv2.erode(table, (3, 3), iterations = 2)

binary_img, inverted_binary_img, img_shape = image_preprocess(table, table_type)

cnts, bboxes = characters_localize(binary_img, table_type)

# Tạo file txt nếu chưa có.
file = open(outputtxt_path, "w+")
file.write("")
file.close()

# Sắp xếp lại thứ tự của mảng
bboxes = bboxes[::-1]
previous = bboxes[0][3]

# Khai báo một biến để lưu kết quả.
text = ""
rect = None
index = 0
cols = []
row = []
N = len(bboxes)

# Tìm height của mỗi bouding box
# heights = [bboxes[i][3] for i in range(len(bboxes))]

# Tìm height của table
# table_height = np.max(heights)

# Tính trung bình cộng của các height.
# mean_of_height = np.mean(heights)

print("Image's Area: ", img_shape[0] * img_shape[1])
print("Table size: ", (wTable, hTable))
print("Image size: ", img_shape)

# Với mỗi contour được xác định, thì mình sẽ lấy ra các bounding box tương ứng.
# Các tọa độ này sẽ được dùng để cắt ra các ảnh con chứa ảnh.
for bbox in bboxes:
  # Tìm bounding box gồm tọa độ x, y, chiều rộng w và chiều cao h.
	x, y, w, h = bbox
 
	# Nếu như height của một box mà lớn hơn mean of height, thì loại box đó ra
	if h >= hTable:
		N = N - 1
		continue
 
	# print("Current Y and Previous: ", y, previous)
	print("Index and N: ", index, N)
 
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
	text += predict
	row.append(predict)
	# print("Predict: ", predict)
	# cv2.imshow("Cropped", cropped)
	# cv2.waitKey(0)
	text += "\n"
	index = index + 1
 
# cv2.imshow("Table localization", rect)
# cv2.waitKey(0)

print("Table data: ", cols)

# Mở file và ghi kết quả vào file txt.
file = open(outputtxt_path, "a", encoding="utf-8")
file.write(text)
file.close()