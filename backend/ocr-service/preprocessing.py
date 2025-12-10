import cv2
import numpy as np

def process_image(image_storage):
    """
    Reads an image from a file storage object (Flask), converts it to a format
    OpenCV can work with, and applies preprocessing steps to improve OCR accuracy.
    """
    # 1. Read the image from the memory buffer
    file_bytes = np.frombuffer(image_storage.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    # 2. Convert to Grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 3. Apply Gaussian Blur
    blur = cv2.GaussianBlur(gray, (5, 5), 0)

    # 4. Apply Thresholding (Binarization)
    _, thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    return thresh
