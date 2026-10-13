========================================================================
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
