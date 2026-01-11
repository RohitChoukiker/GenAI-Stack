from PyPDF2 import PdfReader

def extract_text_from_file(path: str) -> str:
    if path.endswith(".pdf"):
        reader = PdfReader(path)
        return "\n".join(page.extract_text() for page in reader.pages)
    else:
        with open(path, "r") as f:
            return f.read()
