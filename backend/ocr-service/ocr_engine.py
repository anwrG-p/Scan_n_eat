import pytesseract

def extract_text_from_image(processed_image):
    """
    Passes a pre-processed OpenCV image to Tesseract OCR and returns the raw string.
    """

    config_options = "--psm 6"
    
    raw_text = pytesseract.image_to_string(processed_image, config=config_options)
    return raw_text
