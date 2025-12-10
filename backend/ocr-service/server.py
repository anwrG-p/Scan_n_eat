from flask import Flask, request, jsonify
from preprocessing import process_image
from ocr_engine import extract_text_from_image
from text_cleaning import parse_receipt_text

app = Flask(__name__)

@app.route('/scan', methods=['POST'])
def scan_receipt():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # 1. Image Preprocessing
        processed_img = process_image(file)

        # 2. OCR Extraction
        raw_text = extract_text_from_image(processed_img)

        # 3. Text Parsing & Cleaning
        items = parse_receipt_text(raw_text)

        return jsonify({
            "success": True,
            "detected_items": items,
            "raw_text_debug": raw_text  # Optional: for debugging
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Run slightly different for docker/debug
    app.run(host='0.0.0.0', port=5000, debug=True)
