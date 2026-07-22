# B&P Ilusalong payment page

A lightweight multilingual page for copying payment details and opening the Google review page.

## Published address

`https://api.papamio.es`

## GitHub Pages setup

1. Create a public repository, for example `bp-ilusalong`.
2. Upload all files from this folder to the root of the repository.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. Save and wait for the temporary GitHub Pages address to appear.
6. In **Settings → Pages → Custom domain**, enter:
   `api.papamio.es`
7. In IONOS DNS, create this record:
   - Type: `CNAME`
   - Host/Name: `api`
   - Target/Value: `clubtruba.github.io`
8. After DNS verification, enable **Enforce HTTPS** in GitHub Pages.

## Data configured

- IBAN: `EE081010220280807220`
- Company: `B&P Ilusalong OÜ`
- Reviews: `https://share.google/mMH946lIv997Xhiyy`

## Languages

- English
- Russian
- Estonian
