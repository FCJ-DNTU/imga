import cv2
import sys

# Sử dụng sys để add utils vào mới có thể dùng module bên ngoài.
# sys.path.append('d:/Hoctap/Computer Vision/source')
sys.path.append('./')

from definitions import TableType
from modules.imgpreprocessing import __find_n_ocb_table_bboxes

def characters_localize(binary_img, type: TableType = TableType.NORMAL) -> tuple([[cv2.UMat], [cv2.typing.Rect]]):
  """
  Hàm này sẽ định vị trí của các từ trong bảng.

  Tham số:
    binary_img (UMat): Ảnh nhị phân đã qua giai đoạn Image Preprocessing.
    type (TableType): Kiểu của table.

  Trả về:
    tuple([[cv2.UMat], [cv2.typing.Rect]]): Các contours.
  """
  cnts, cnts_hierarchy = cv2.findContours(binary_img, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
  bboxes = []
  if type == TableType.NORMAL or type == TableType.ONLY_COVERED_BORDERS:
    bboxes = []
    index = -1
    max = 0
    for cnt in cnts:
      bbox = cv2.boundingRect(cnt)
      x, y, w, h = bbox
      
      if h > max:
        max = h
        index = index + 1
      
      bboxes.append(bbox)
    bboxes.pop(index)
    
  if type == TableType.ONLY_HORIZONTAL_LINES:
    bboxes = [cv2.boundingRect(ccnt) for ccnt in cnts]
    
  if type == TableType.ONLY_VERTICAL_LINES:
    bboxes = [cv2.boundingRect(ccnt) for ccnt in cnts]
    
  return cnts, bboxes