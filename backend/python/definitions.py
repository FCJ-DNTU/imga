# Khai báo và định nghĩa một số biến toàn cục
import sys
import os
from enum import Enum

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

def get_path(*paths):
  """
  Dùng hàm này để lấy ra đường dẫn tuyệt đối tới một file bất kì.
  """
  
  return os.path.normpath(os.path.join(ROOT_DIR, *paths))


class TableType(Enum):
  """
  Các kiểu của table. Bao gồm:
  - Normal table: là bảng đầy đủ các đường viền dọc và ngang.
  - Only horizontal lines table: là bảng chỉ có đường viền ngang.
  - Only vertical lines table: là bảng chỉ có đường viền dọc.
  - Only coverd borders table: là bảng chỉ có đường viền bao quanh.
  - Non borders table: là bảng không có các đường viền, nó chỉ có cấu trúc của bảng.
  Cho dù bên trong có đường viền đi chăng nữa thì cũng tính là cài này.
  - Non borders table: là bảng không có đường viền nào cả.
  """
  NORMAL = 1
  ONLY_HORIZONTAL_LINES = 2
  ONLY_VERTICAL_LINES = 3
  ONLY_COVERED_BORDERS = 4
  NON_BORDERS = 5