import fitz  # PyMuPDF
import sys
import os

def convert_pdf_to_png(pdf_path, output_png_path, dpi=300):
    try:
        # Open PDF
        print(f"Opening: {pdf_path}")
        doc = fitz.open(pdf_path)
        
        # Load the first page
        page = doc.load_page(0)
        
        # Configure matrix for higher resolution (DPI)
        zoom = dpi / 72.0
        mat = fitz.Matrix(zoom, zoom)
        
        # Render page to a pixmap with an alpha channel (transparent background)
        pix = page.get_pixmap(matrix=mat, alpha=True)
        
        # Save to PNG
        pix.save(output_png_path)
        print(f"Successfully saved to: {output_png_path}")
        
    except Exception as e:
        print(f"Error converting {pdf_path}: {e}")
        sys.exit(1)

if __name__ == "__main__":
    base_dir = r"c:\Users\arxhe\Desktop\NEW WEB M ONE 2026\Logo"
    output_dir = r"c:\Users\arxhe\Desktop\NEW WEB M ONE 2026\m-one-webpage-1.4\public\logos"
    
    os.makedirs(output_dir, exist_ok=True)
    
    # Files
    weiss_pdf = os.path.join(base_dir, "M-ONE logo Lang weiss.pdf")
    schwarz_pdf = os.path.join(base_dir, "M-ONE logo Lang schwarz.pdf")
    
    weiss_png = os.path.join(output_dir, "M-ONE_logo_Lang_weiss.png")
    schwarz_png = os.path.join(output_dir, "M-ONE_logo_Lang_schwarz.png")
    
    convert_pdf_to_png(weiss_pdf, weiss_png, dpi=300)
    convert_pdf_to_png(schwarz_pdf, schwarz_png, dpi=300)
    
    print("Done")
