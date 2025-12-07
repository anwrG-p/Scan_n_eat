import re

def parse_receipt_text(raw_text):
    """
    Clean the raw text from OCR to extract likely product names.
    Filters out prices, noise, and short strings.
    """
    lines = raw_text.split('\n')
    detected_items = []

    # Regex to detect price-like patterns (e.g., 12.99, $10.00, 4.50 B)
    # Matches lines ending with a number pattern, optionally with currency info
    price_pattern = re.compile(r'\d+\.\d{2}\s*?[A-Z]*$')
    
    # Common receipt noise/header words to exclude
    stop_words = {"SUBTOTAL", "TOTAL", "TAX", "CASH", "CHANGE", "CREDIT", "DEBIT", "VISA", "MASTERCARD", "TEL", "FAX", "DATE", "TIME", "RECEIPT", "WELCOME", "VISIT", "LB", "KG", "@"}

    for line in lines:
        cleaned_line = line.strip()
        
        # 1. Skip empty lines
        if not cleaned_line:
            continue

        # 2. Skip very short lines (artifacts)
        if len(cleaned_line) < 3:
            continue

        # 3. Skip lines that look like pure prices or dates (simplistic check)
        
        if price_pattern.search(cleaned_line):
            # Attempt to extract text BEFORE the price
            
            parts = re.split(r'\s+\d', cleaned_line)
            if parts:
                cleaned_line = parts[0].strip()

        # 4. Filter out lines that are just stop words or contain them in a way that suggests metadata
        upper_line = cleaned_line.upper()
        if any(word in upper_line for word in stop_words):
            continue

        # 5. Final sanity check: does it look like a word?
        if cleaned_line and not cleaned_line.isnumeric():
            detected_items.append(cleaned_line)

    return detected_items
