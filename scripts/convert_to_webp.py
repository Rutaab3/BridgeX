"""
Image Optimization Script for BridgeX
Converts all images in the images folder to WebP format
"""

from PIL import Image
import os
from pathlib import Path

def convert_to_webp(source_path, quality=85):
    """
    Convert an image to WebP format
    
    Args:
        source_path: Path to the source image
        quality: WebP quality (0-100, default 85)
    
    Returns:
        Path to the converted WebP file or None if conversion failed
    """
    try:
        # Skip if already webp
        if source_path.lower().endswith('.webp'):
            print(f"Skipping {source_path} (already WebP)")
            return None
            
        # Open image
        img = Image.open(source_path)
        
        # Convert RGBA to RGB if necessary
        if img.mode in ('RGBA', 'LA', 'P'):
            # Create white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background
        
        # Create output path
        output_path = str(Path(source_path).with_suffix('.webp'))
        
        # Save as WebP
        img.save(output_path, 'WEBP', quality=quality, method=6)
        
        # Get file sizes
        original_size = os.path.getsize(source_path) / 1024  # KB
        new_size = os.path.getsize(output_path) / 1024  # KB
        savings = ((original_size - new_size) / original_size) * 100
        
        print(f"[OK] {Path(source_path).name}")
        print(f"  Original: {original_size:.1f} KB -> WebP: {new_size:.1f} KB (Saved {savings:.1f}%)")
        
        return output_path
        
    except Exception as e:
        print(f"[ERROR] Error converting {source_path}: {str(e)}")
        return None

def main():
    """Main conversion function"""
    images_dir = Path(__file__).parent / 'images'
    
    if not images_dir.exists():
        print(f"Error: Images directory not found at {images_dir}")
        return
    
    # Supported image formats
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'}
    
    # Find all images
    image_files = []
    for ext in image_extensions:
        image_files.extend(images_dir.glob(f'*{ext}'))
        image_files.extend(images_dir.glob(f'*{ext.upper()}'))
    
    if not image_files:
        print("No images found to convert")
        return
    
    print(f"\n*** Found {len(image_files)} images to convert\n")
    print("=" * 60)
    
    converted = 0
    total_original_size = 0
    total_new_size = 0
    
    for img_file in sorted(image_files):
        original_size = os.path.getsize(img_file) / 1024
        total_original_size += original_size
        
        webp_path = convert_to_webp(str(img_file), quality=85)
        
        if webp_path:
            converted += 1
            new_size = os.path.getsize(webp_path) / 1024
            total_new_size += new_size
        
        print()
    
    print("=" * 60)
    print(f"\n[SUCCESS] Conversion Complete!")
    print(f"Statistics:")
    print(f"   - Images converted: {converted}/{len(image_files)}")
    print(f"   - Total original size: {total_original_size:.1f} KB ({total_original_size/1024:.1f} MB)")
    print(f"   - Total new size: {total_new_size:.1f} KB ({total_new_size/1024:.1f} MB)")
    print(f"   - Total savings: {total_original_size - total_new_size:.1f} KB ({((total_original_size - total_new_size)/total_original_size)*100:.1f}%)")
    print(f"\nNext steps:")
    print(f"   1. Update HTML files to reference .webp images")
    print(f"   2. Update README.md with .webp references")
    print(f"   3. Test the website to ensure all images load")
    print(f"   4. Optionally delete old image files to save space")

if __name__ == "__main__":
    main()
