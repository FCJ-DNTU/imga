# DIITT Python Programs
Chương trình Python bao gồm các chương trình con dùng để thực hiện một số nhiệm vụ, công việc được "nhờ" từ ứng dụng API.

## Tech stack
1. Python
2. Pytorch
3. Numpy, OpenCV

## About
Chương trình Python được xây dựng bằng Python cùng với Pytorch cùng với một số mô hình Neuron khác và các thư viện khác như numpy, cv2 (open-cv). Để thực hiện một hay nhiều nhiệm vụ từ ứng dụng API.

Lấy dữ liệu của ảnh cùng một số thông tin được gửi về từ ứng dụng API, từ đó chương trình python sẽ chịu trách nhiệm xử lý và tính toán các thông tin này. Sau đó là gửi lại dữ liệu cho ứng dụng API.

Phục vụ cho việc test, thì ứng dụng API sẽ hỗ trợ một số thứ sau:
- Làm mờ ảnh.
- Chuyển đổi ảnh màu thành xám.
- Nhận diện khuôn mặt trong ảnh.

Folder `test` sẽ chứa các script test chính của app. Còn các script như là `blur_image.py`, `change_color_image.py` và `face_recognition.py` là những script dùng với product, nhưng chỉ là những chức năng TEST (test này khác với test trong folder `test`, anh em lưu ý)

# Installation
Một số thứ yêu cầu phải được cài đặt

```
opencv-python
numpy
matplotlib
pytesseract
```

Có một thư mục tên là `builds`. Thư mục này sẽ chứa các thư viện được đã được build hoàn chỉnh. Và có một số thứ yêu cầu phải cài như sau (làm theo hướng dẫn)

__Tesseract OCR__ ([tải ở đây](https://digi.bib.uni-mannheim.de/tesseract/tesseract-ocr-w64-setup-5.3.3.20231005.exe))
Hướng dẫn
Sau khi tải xong thì ấn vào cài đặt. Cái này thì không cần phải hướng dẫn nữa, chủ yêu là hướng dẫn cài ở đâu thôi. Giờ thì chọn thư mục cần cài, vào trong folder của dự án (`datatable-image-to-text`), vào tiếp `python/builds`, tạo một folder tên là `tesseract` rồi copy đường dẫn vào ô cài đặt.

__Vietnamese Support__ ([tải ở đây](https://github.com/tesseract-ocr/tessdata/blob/main/vie.traineddata))
Bởi vì Tesseract mặc định chỉ nhận diện tiếng Anh cho nên mình cần phải cài một phần *dữ liệu đã được huấn luyện để nhận diện tiếng Việt* nữa mình mới có thể dùng được tiếng Việt.

Hướng dẫn
Sau khi vào link, thì ấn vào biểu tượng tải về. Sau đó vào thư mục đã cài tesseract (`datatable-image-to-text/python/builds/tesseract`) và tiếp tục vào thư mục `tessdata` và bỏ file `vie.traineddata` vào trong thư mục này. File `vie.traineddata` đã có ở trong này rồi, nhưng mà nó rất nhẹ nên không đủ để nhận diện tiếng Việt.

<div align="center">
  <img src="https://github.com/NguyenAnhTuan1912/datatable-image-to-text/assets/86825061/5154656e-9261-4db1-b3f2-0071554b73cb" alt="Tesseract path guide"/>
</div>

Cuối cùng là ấn next và cài đặt. Sau khi cài xong thì kiếm một tấm hình có chữ, bỏ vào trong `python/test/images` rồi lấy tên file đó sửa trong `python/test/image_to_text.py` rồi thực thi script, kết quả sẽ được ghi ra file `python/test/out/regconized.txt`.

## Image Preprocessing
Trước khi đọc tiếp phần idea trong này, thì xin mời đọc [ở đây](https://docs.google.com/document/d/1r80sEoKBzR5vyn8d18Chj9vM5H4zEoGL21VuD_rg9MA/edit) trước. Phần này là phần ý tưởng chính cho giai đoạn Image Preprocessing (phần quan trọng nhất trong bài này).

Như đã đề cập ở trong bài, thì bảng có thể sẽ có ngoại lệ, nên mình phải chia ra xử lý 2 trường hợp riêng biệt.

### Normal Table
Bảng thường sẽ là bảng có đầy đủ các đường viền của từ ô dữ liệu, đây là loại bảng lý tưởng nhất trong việc nhận diện và trích xuất dữ liệu trong bảng. Với bảng ở dạng này, thì việc duy nhất mà mình cần phải làm là lấy ra các đường viền dọc và ngang để tìm contours cho từng ô dữ liệu, sau cùng là Bounding Box. Giống với ý tưởng hiện tại.

```python
def __n_table_image_preprocess(binary_img, img_shape) -> cv2.UMat:
  """
  Hàm này dùng để xử lý ảnh có chứa kiểu bảng bình thường (Normal table).

  Args:
    binary_img (UMat): Ảnh nhị phân đã được xử lý trước đó.
    img_shape (Tuple(int, int)): Kích thước của ảnh.

  Trả về:
    UMat: Ảnh nhị phân đã qua xử lý. Là ảnh mà các đường viền trong bảng được làm dày.
  """
  # Khai báo một số biến.
  kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
  kernel_length = img_shape[1] // 80
  
  # Tạo lần lượt 2 kernels để erode và dilate cạnh ngang và cạnh dọc
  vertical_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, kernel_length))
  horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_length, 1))
  
  # Erode ảnh để lấy lần lượt cạnh dọc và ngang
  eroded_vertical_img = cv2.erode(binary_img, vertical_kernel, iterations = 5)
  eroded_horizontal_img = cv2.erode(binary_img, horizontal_kernel, iterations = 5)

  # Làm sáng và dày các cạnh với dilate
  vertical_lines = cv2.dilate(eroded_vertical_img, vertical_kernel, iterations = 5)
  horizontal_lines = cv2.dilate(eroded_horizontal_img, horizontal_kernel, iterations = 5)
  
  alpha = 0.5
  beta = 1.0 - alpha
  vertical_horizontal_lines = cv2.addWeighted(vertical_lines, alpha, horizontal_lines, beta, 1)
  vertical_horizontal_lines = cv2.erode(~vertical_horizontal_lines, kernel, iterations = 2)
  thresh, vertical_horizontal_lines = cv2.threshold(vertical_horizontal_lines, 128, 255, cv2.THRESH_OTSU | cv2.THRESH_BINARY_INV)
  return  vertical_horizontal_lines
```

### Exceptional Tables
Các bảng ngoại lệ là những bảng mà trong đó nó khác với bảng thưởng ở chỗ là nó có thể chỉ có viền ngang hoặc viền dọc. Hoặc chỉ có đường viền bao quanh bảng... Với bảng dạng này thì không thể nào xử lý như với bảng thông thường được, buộc phải xử lý theo từng loại bảng riêng biệt. Trong đó có một số loại bảng như sau:
- Bảng chỉ có viền ngang ("Only horizontal lines" table).
- Bảng chỉ có viền dọc ("Only vertical lines" table).
- Bảng chỉ có viền bao bên ngoài ("Only borders" table).
- Bảng không có viền (khó) ("Non borders" table).

Điểm chung cho tất cả các dạng bảng kiểu này là đều cùng xử lý dilate từ, ký tự. Nghĩa là mình không tìm contours và bouding boxes cho các ô dữ liệu nữa, mà thay vào đó là tìm contours và bounding boxes cho từng từ. Trong quá trình tìm các contours và bounding boxes thì có thể sẽ tìm "dư" một số cnts hoặc bboxes. Thì với mỗi các xử lý từ loại ảnh bên dưới, mà mình sẽ lấy được những cnts và bboxes cần thiết. Để làm được như thế thì mình cần phải tìm được *biên*.

Các bảng kiểu này nó "bị hở" (trừ thằng có viền bao bên ngoài ra) trong quá trình tìm contours cho ô dữ liệu, cho nên là mình phải hướng đến cách tìm khác. Còn thằng mà *chỉ có viền bao bên ngoài* thì nó lại "bị rỗng" ở bên trong, khiến cho việc tìm các ô dữ liệu không chính xác. Cho nên nó cũng sẽ có cách xử lý khác. Còn bảng không có viền thì ở trường hợp đặc biệt hơn.

#### "Only horizontal lines" table
Với những bảng mà chỉ có viền ngang, thì các contours sẽ là của các viền ngang đó, tuy nhiên, mình chỉ cần quan tâm tới viền đầu và viền cuối để tìm ra *biên* của bảng. Khi đã tìm ra được *biên* rồi thì lúc này mình chỉ cần lọc các contours của từ mà đã được tìm kiếm trước đó.

```python
def __ohl_table_image_preprocess(binary_img, img_shape):
  # Copy ảnh
  copy = binary_img.copy()
  
  # Khai báo một số biến.
  kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (8, 8))
  kernel_length = img_shape[1] // 80
  
  # Lấy kernel để erode và dilate đường viền ngang.
  horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_length, 1))
  
  eroded_horizontal_img = cv2.erode(binary_img, horizontal_kernel, iterations = 5)
  result = cv2.dilate(eroded_horizontal_img, horizontal_kernel, iterations = 5)
  
  # Xóa các đường viền ngang.
  # Tìm contours của các đường này trước.
  cnts, cnts_hierarchy = cv2.findContours(result, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
  
  cv2.drawContours(copy, cnts, -1, (0, 0, 0), 3)
  
  cv2.imshow("Remove horizontal line", copy)
  cv2.waitKey(0)
  
  # Dilate chữ
  result = cv2.dilate(copy, kernel, iterations = 1)
  
  return result
```

#### "Only vertical lines" table
Giống với cách xử lý của `"Only horizontal lines" table`, thì ở đây mình phải tìm được cạnh đọc đầu và cuối của bảng, từ đó sẽ tìm được *biên* và lọc các contours của từ mà đã được tìm kiếm trước đó.

```python
def __ovl_table_image_preprocess(binary_image, img_shape) -> cv2.UMat:
  """
  Hàm này sẽ xử lý ảnh mà bảng của nó chỉ có các đường viền dọc (Only vertical lines table).

  Args:
    binary_image (cv2.UMat): Ảnh nhị phân cần được xử lý.
    img_shape (cv2.UMat): Kích thước của ảnh.

  Returns:
    cv2.UMat: Ảnh nhị phân đã được xử lý.
  """
  # Copy ảnh
  copy = binary_image.copy()
  
  # Khai báo một số biến.
  kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (6, 6))
  kernel_length = img_shape[1] // 80
  
  # Lấy kernel để erode và dilate đường viền ngang.
  vertical_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, kernel_length))
  
  eroded_vertical_img = cv2.erode(binary_image, vertical_kernel, iterations = 5)
  result = cv2.dilate(eroded_vertical_img, vertical_kernel, iterations = 5)
  
  # Xóa các đường viền dọc.
  # Tìm contours của các đường này trước.
  cnts, cnts_hierarchy = cv2.findContours(result, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
  
  cv2.drawContours(copy, cnts, -1, (0, 0, 0), 3)
  
  cv2.imshow("Remove horizontal line", copy)
  cv2.waitKey(0)
  
  # Dilate chữ
  result = cv2.dilate(copy, kernel, iterations = 1)
  
  return result
```

#### "Only borders" table
Với thằng này thì mình chỉ cần lấy contour của table (viền ngoài) để tạo ra *biên*, phần còn lại là xử lý giống với hai thằng ở trên.

```python
def __ocb_table_image_preprocess(binary_image, img_shape) -> cv2.UMat:
  """
  Hàm này sẽ xử lý ảnh mà bảng của nó chỉ có các đường viền bao quanh (Only borders table).

  Args:
    binary_image (cv2.UMat): Ảnh nhị phân cần được xử lý.
    img_shape (cv2.UMat): Kích thước của ảnh.

  Returns:
    cv2.UMat: Ảnh nhị phân đã được xử lý.
  """
  # Khai báo một số biến.
  kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (6, 6))
  
  result = __n_table_image_preprocess(binary_image, img_shape)
  
  copy = binary_image.copy()
  
  cv2.imshow("RESULT", result)
  cv2.waitKey(0)
  
  # Xóa các đường viền dọc và ngang.
  # Tìm contours của các đường này trước.
  cnts, cnts_hierarchy = cv2.findContours(result, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
  
  cv2.drawContours(copy, cnts, -1, (0, 0, 0), 10)
  
  cv2.imshow("Remove horizontal line", copy)
  cv2.waitKey(0)
  
  # Dilate chữ
  result = cv2.dilate(copy, kernel, iterations = 1)
  
  return result
```

### "Non borders" table
Đây là trường hợp ngoại lệ đặc biệt khó nhất. Nó khó nhất là bởi vì nó chỉ có cấu trúc của bảng (thực chất nó ở hai dạng là vừa có vừa không, nhưng khi cho vào để nhận diện thì nó được mặc định là có cấu trúc dạng dảng), mà không thật sự là một bảng, nhưng trong mộ vài trường hợp thì nó vẫn là một bảng, hơi rối nhỉ. Vì thể, dữ liệu của nó có thể sẽ bị xen lẫn như các trường hợp ở trên, nhưng mà mình không tìm được *biên* để lọc ra các contours hợp lệ.

```python
```