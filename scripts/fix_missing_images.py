"""
Fix missing image references in CSS and HTML files
Targeting data-bs-image attributes and CSS url()
"""

import os
import re
from pathlib import Path

def update_file_images(file_path):
    """Update image references in a file to use WebP format"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        replacements = 0
        
        # Image extensions to replace
        image_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.PNG', '.JPG', '.JPEG', '.GIF', '.BMP', '.TIFF']
        ext_pattern = '|'.join(re.escape(ext) for ext in image_extensions)
        
        # Patterns to fix
        patterns = [
            # HTML data attributes: data-bs-image="./images/image.ext"
            (r'data-bs-image="([^"]*?({}))"'.format(ext_pattern),
             lambda m: f'data-bs-image="{m.group(1).rsplit(".", 1)[0]}.webp"'),
            
            # CSS url attributes: url('../images/image.ext') or url("../images/image.ext")
            # Handling escaped spaces too
            (r'url\([\'"]?([^)]*?({}))[\'"]?\)'.format(ext_pattern),
             lambda m: f'url(\'{m.group(1).rsplit(".", 1)[0]}.webp\')'),
        ]
        
        for pattern, replacement in patterns:
            content, count = re.subn(pattern, replacement, content)
            replacements += count
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return replacements
        
        return 0
        
    except Exception as e:
        print(f"[ERROR] Failed to update {file_path}: {str(e)}")
        return 0

def main():
    """Main function to update all files"""
    project_root = Path(__file__).parent.parent
    
    # Files to update - recursively find html and css
    files_to_update = []
    files_to_update.extend(project_root.glob('*.html'))
    files_to_update.extend(project_root.glob('css/*.css'))
    
    if not files_to_update:
        print("No files found to update")
        return
    
    print(f"\n*** Checking {len(files_to_update)} files for missing WebP references\n")
    print("=" * 60)
    
    total_replacements = 0
    updated_files = 0
    
    for file_path in sorted(files_to_update):
        replacements = update_file_images(file_path)
        if replacements > 0:
            print(f"[FIXED] {file_path.name}: {replacements} reference(s) updated")
            total_replacements += replacements
            updated_files += 1
    
    print("=" * 60)
    print(f"\n[SUCCESS] Fix Complete!")
    print(f"Statistics:")
    print(f"   - Files updated: {updated_files}")
    print(f"   - Total references fixed: {total_replacements}")

if __name__ == "__main__":
    main()
