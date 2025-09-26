# TODO: Integrate FontAwesome Icons

## Plan
- Add FontAwesome CDN link to index.html head for free icons.
- Update src/components/TopBar.tsx: Replace ⚙️ with <i className="fas fa-cog"></i>, 👤 with <i className="fas fa-user"></i>.
- Update src/components/Highlights.tsx: Replace card icons with FA equivalents (☀️ -> <i className="fas fa-sun"></i>, 🌪️ -> <i className="fas fa-wind"></i>, 🌅 -> <i className="fas fa-sun"></i>, 💧 -> <i className="fas fa-tint"></i>, 👁️ -> <i className="fas fa-eye"></i>).
- For air quality, use FA faces if possible, else keep dynamic.
- Test in browser to ensure icons display.

## Dependent Files to be Edited
- index.html: Add FA link.
- src/components/TopBar.tsx: Icon replacements.
- src/components/Highlights.tsx: Icon replacements.

## Followup Steps
- Run dev server and check icons in browser.
- If issues, adjust classes or add custom styles.

## Status
- [x] Add FA to index.html
- [x] Update TopBar.tsx
- [x] Update Highlights.tsx
- [ ] Test icons
