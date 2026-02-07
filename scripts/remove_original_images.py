"""
Remove original image files after WebP conversion
Keeps only .webp files and deletes PNG, JPG, JPEG, GIF, BMP, TIFF files
"""

import os
from pathlib import Path

def remove_original_images():
    """Remove original image files, keeping only WebP versions"""
    images_dir = Path(__file__).parent / 'images'
    
    if not images_dir.exists():
        print(f"Error: Images directory not found at {images_dir}")
        return
    
    # Extensions to remove
    extensions_to_remove = {'.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', 
                           '.PNG', '.JPG', '.JPEG', '.GIF', '.BMP', '.TIFF'}
    
    # Find all files to remove
    files_to_remove = []
    for ext in extensions_to_remove:
        files_to_remove.extend(images_dir.glob(f'*{ext}'))
    
    if not files_to_remove:
        print("No original image files found to remove")
        return
    
    print(f"\n*** Removing {len(files_to_remove)} original image files\n")
    print("=" * 60)
    
    total_size = 0
    removed_count = 0
    
    for file_path in sorted(files_to_remove):
        try:
            file_size = os.path.getsize(file_path) / 1024  # KB
            total_size += file_size
            os.remove(file_path)
            print(f"[DELETED] {file_path.name} ({file_size:.1f} KB)")
            removed_count += 1
        except Exception as e:
            print(f"[ERROR] Failed to delete {file_path.name}: {str(e)}")
    
    print("=" * 60)
    print(f"\n[SUCCESS] Cleanup Complete!")
    print(f"Statistics:")
    print(f"   - Files deleted: {removed_count}/{len(files_to_remove)}")
    print(f"   - Space freed: {total_size:.1f} KB ({total_size/1024:.1f} MB)")
    print(f"\nOnly .webp images remain in the images folder")

if __name__ == "__main__":
    remove_original_images()
