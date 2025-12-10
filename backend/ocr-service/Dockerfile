# Use a stable Debian Bookworm release to avoid "trixie" (testing) instability
FROM python:3.9-slim-bookworm

WORKDIR /app

# 1. Install system dependencies for Tesseract and OpenCV
# libgl1 + libglib2.0-0 are required for opencv-python-headless
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*


COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "server.py"]
