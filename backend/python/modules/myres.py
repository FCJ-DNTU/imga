import json

class MyRes:
  """
  MyRes
  =====
  Hỗ trợ
  - get_message: Tạo một message ở dạng json.
  """

def get_message(
  message = "",
  data = "",
  isDone = 0,
  isError = 0
):
  """
  Dùng phương thức này để tạo ra một message ở dạng json để gửi về cho Javascript.
  """
  obj = {
    "message": message,
    "data": data,
    "isDone": isDone,
    "isError": isError
  }
  
  return json.dumps(obj)