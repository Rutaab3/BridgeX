"""
Update HTML and README files to use WebP images
This script updates all image references in HTML files and README.md
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
        
        # Regular expressions for different image reference formats
        patterns = [
            # HTML src attributes: src="path/to/image.ext"
            (r'src="([^"]*?({}))"'.format('|'.join(re.escape(ext) for ext in image_extensions)),
             lambda m: f'src="{m.group(1).rsplit(".", 1)[0]}.webp"'),
            
            # HTML src attributes with single quotes: src='path/to/image.ext'
            (r"src='([^']*?({}))'".format('|'.join(re.escape(ext) for ext in image_extensions)),
             lambda m: f"src='{m.group(1).rsplit('.', 1)[0]}.webp'"),
            
            # Markdown images: ![alt](path/to/image.ext)
            (r'!\[([^\]]*)\]\(([^)]*?({}))\)'.format('|'.join(re.escape(ext) for ext in image_extensions)),
             lambda m: f'![{m.group(1)}]({m.group(2).rsplit(".", 1)[0]}.webp)'),
             
            # href attributes for icons and images
            (r'href="([^"]*?({}))"'.format('|'.join(re.escape(ext) for ext in image_extensions)),
             lambda m: f'href="{m.group(1).rsplit(".", 1)[0]}.webp"'),
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
    project_root = Path(__file__).parent
    
    #Files to update
    html_files = list(project_root.glob('*.html'))
    readme_files = list(project_root.glob('README.md'))
    
    all_files = html_files + readme_files
    
    if not all_files:
        print("No HTML or README files found")
        return
    
    print(f"\n*** Updating {len(all_files)} files to use WebP images\n")
    print("=" * 60)
    
    total_replacements = 0
    updated_files = 0
    
    for file_path in sorted(all_files):
        replacements = update_file_images(file_path)
        if replacements > 0:
            print(f"[OK] {file_path.name}: {replacements} image reference(s) updated")
            total_replacements += replacements
            updated_files += 1
        else:
            print(f"[SKIP] {file_path.name}: No images to update")
    
    print("=" * 60)
    print(f"\n[SUCCESS] Update Complete!")
    print(f"Statistics:")
    print(f"   - Files processed: {len(all_files)}")
    print(f"   - Files updated: {updated_files}")
    print(f"   - Total image references updated: {total_replacements}")
    print(f"\nNext steps:")
    print(f"   1. Test the website in a browser")
    print(f"   2. Verify all images display correctly")
    print(f"   3. Optionally delete original image files")

if __name__ == "__main__":
    main()
