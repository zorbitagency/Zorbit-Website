#!/usr/bin/env python3
import os
import zipfile
import subprocess
import shutil

ROOT_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
DIST_DIR = os.path.join(ROOT_DIR, "dist")
DOWNLOADS_DIR = os.path.join(ROOT_DIR, "public", "downloads")
os.makedirs(DOWNLOADS_DIR, exist_ok=True)

print("Building production static site...")
subprocess.run(["npm", "run", "build"], cwd=ROOT_DIR, check=True)

# 1. Create .htaccess inside dist for GoDaddy cPanel/Apache
htaccess_content = """# GoDaddy Apache Server Configuration for Single Page Application
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Caching & Compression for Production Speed
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
"""

with open(os.path.join(DIST_DIR, ".htaccess"), "w") as f:
    f.write(htaccess_content)

# 2. Create README_GODADDY.txt inside dist
readme_content = """========================================================================
   MONOLITH MARKETING AGENCY // GODADDY DEPLOYMENT GUIDE
========================================================================

Congratulations! This package contains the complete production-ready build
of your dynamic marketing agency website.

------------------------------------------------------------------------
OPTION A: GODADDY WEB HOSTING / CPANEL (RECOMMENDED METHOD)
------------------------------------------------------------------------
This is the standard and best way to host modern, custom-built websites on GoDaddy.

Step 1: Log in to your GoDaddy Account (https://godaddy.com)
Step 2: Go to "My Products" -> Scroll to "Web Hosting" (or "cPanel Hosting") and click "Manage".
Step 3: Click "cPanel Admin" to open your hosting dashboard.
Step 4: Click on "File Manager".
Step 5: Navigate inside the "public_html" directory.
        (Note: If you have existing default placeholder files like 'index.php' or 'welcome.html', 
        you can back them up or delete them).
Step 6: Click "Upload" in the top toolbar.
Step 7: Upload this zip file ("godaddy_website_build.zip").
Step 8: Once uploaded, right-click "godaddy_website_build.zip" in File Manager and select "Extract".
Step 9: Extract directly into public_html.
        Ensure index.html and the 'assets' folder are directly inside public_html (not nested in a subfolder).
Step 10: Visit your domain in your browser! Your dynamic marketing website is live.

------------------------------------------------------------------------
OPTION B: GODADDY WEBSITE BUILDER
------------------------------------------------------------------------
Important Note: GoDaddy Website Builder is a proprietary drag-and-drop tool
with pre-made templates. It does not allow importing arbitrary custom React/HTML zip files
directly as template themes.

If your current plan is "GoDaddy Website Builder" rather than "cPanel / Web Hosting":
1. The recommended approach is to use GoDaddy "Web Hosting" (cPanel or Managed WordPress with static hosting),
   which gives you full domain hosting freedom and costs similarly or less.
2. Alternatively, in GoDaddy Website Builder, you can add an "HTML" section / Embed block, or point
   a subdomain (e.g. agency.yourdomain.com or www.yourdomain.com) to your Web Hosting.

------------------------------------------------------------------------
CONTENTS OF THIS BUILD:
------------------------------------------------------------------------
- index.html              : High-performance HTML entry point
- assets/                 : Minified, tree-shaken JavaScript bundle & CSS stylesheets
- .htaccess               : GoDaddy Apache rules for SPA URL handling, gzip compression, and caching
- README_GODADDY.txt      : This deployment documentation

Need to make edits?
Simply unpack, update images or text, or re-export from your AI Studio environment anytime.
========================================================================
"""

with open(os.path.join(DIST_DIR, "README_GODADDY.txt"), "w") as f:
    f.write(readme_content)

# Copy dist to docs for GitHub Pages /docs folder support
docs_dir = os.path.join(ROOT_DIR, "docs")
if os.path.exists(docs_dir):
    shutil.rmtree(docs_dir)
shutil.copytree(DIST_DIR, docs_dir)
print("Synced build to docs/ directory for zero-config GitHub Pages deployment!")

# 3. Create godaddy_website_build.zip
godaddy_zip_path = os.path.join(DOWNLOADS_DIR, "godaddy_website_build.zip")
print(f"Creating {godaddy_zip_path}...")
with zipfile.ZipFile(godaddy_zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(DIST_DIR):
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, DIST_DIR)
            zipf.write(file_path, arcname)

print("Godaddy build zip created successfully!")

# 4. Create source code zip (excluding node_modules, dist, .git, etc.)
source_zip_path = os.path.join(DOWNLOADS_DIR, "monolith_agency_source.zip")
print(f"Creating {source_zip_path}...")
exclude_dirs = {"node_modules", "dist", ".git", ".aistudio"}
exclude_files = {"package-lock.json"}

with zipfile.ZipFile(source_zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(ROOT_DIR):
        # Modify dirs in-place to skip excluded directories
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for file in files:
            if file in exclude_files or file.endswith(".zip"):
                continue
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, ROOT_DIR)
            zipf.write(file_path, arcname)

print("Source code zip created successfully!")
print("Zip packing complete!")
