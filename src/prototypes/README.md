# Portfolio Website Prototypes

Three distinct design variations of the Gregory Wilson Jr. portfolio website, all maintaining the signature **Tron Ares black and red aesthetic**.

## 🎨 Prototype Themes

### Prototype 1: Circuit Board ⚡
**Style:** Geometric, technical, futuristic
- Hexagonal grid patterns with animated circuit traces
- Angular clipped corners on cards
- Geometric hexagon icons and borders
- Circuit node pulse animations
- Technical/engineering aesthetic
- Monospace font (Courier New)

**Best For:** Technical/engineering portfolios, showcasing precision and structure

---

### Prototype 2: Holographic 🌟
**Style:** Premium, modern, depth-focused
- Glass morphism with backdrop blur effects
- Iridescent gradient animations
- Smooth, rounded corners
- Floating light particles and orbs
- Holographic shine effects
- Premium modern fonts (Segoe UI, Roboto)

**Best For:** Creative/premium portfolios, showcasing innovation and polish

---

### Prototype 3: Terminal 💻
**Style:** Retro CRT, hacker aesthetic
- Scanline overlays simulating CRT screens
- Terminal window-style cards with headers
- Glitch and flicker effects
- Monospace CLI-inspired layout
- ASCII borders and decorations
- Retro phosphor glow

**Best For:** Cybersecurity/DevOps portfolios, showcasing technical expertise

---

## 🚀 How to Use

### Method 1: Quick Preview (Swap CSS Files)

1. **Backup your current styles:**
   ```bash
   # Navigate to your project
   cd my_personal_website
   ```

2. **Choose a prototype and swap the main index.css:**

   **For Circuit Board:**
   ```bash
   cp src/index.css src/index.css.backup
   cp src/prototypes/prototype1-circuit.css src/index.css
   cp src/components/Hero.css src/components/Hero.css.backup
   cp src/prototypes/Hero-circuit.css src/components/Hero.css
   ```

   **For Holographic:**
   ```bash
   cp src/index.css src/index.css.backup
   cp src/prototypes/prototype2-holographic.css src/index.css
   cp src/components/Hero.css src/components/Hero.css.backup
   cp src/prototypes/Hero-holographic.css src/components/Hero.css
   ```

   **For Terminal:**
   ```bash
   cp src/index.css src/index.css.backup
   cp src/prototypes/prototype3-terminal.css src/index.css
   cp src/components/Hero.css src/components/Hero.css.backup
   cp src/prototypes/Hero-terminal.css src/components/Hero.css
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **View at:** `http://localhost:5173`

---

### Method 2: Side-by-Side Comparison

Create separate builds for each prototype:

1. **Create three copies of your project folder:**
   ```bash
   cd ..
   cp -r my_personal_website prototype1-circuit
   cp -r my_personal_website prototype2-holographic
   cp -r my_personal_website prototype3-terminal
   ```

2. **Apply styles to each:**
   ```bash
   # Circuit
   cd prototype1-circuit
   cp src/prototypes/prototype1-circuit.css src/index.css
   cp src/prototypes/Hero-circuit.css src/components/Hero.css
   
   # Holographic
   cd ../prototype2-holographic
   cp src/prototypes/prototype2-holographic.css src/index.css
   cp src/prototypes/Hero-holographic.css src/components/Hero.css
   
   # Terminal
   cd ../prototype3-terminal
   cp src/prototypes/prototype3-terminal.css src/index.css
   cp src/prototypes/Hero-terminal.css src/components/Hero.css
   ```

3. **Run each on different ports:**
   ```bash
   # Terminal 1 - Circuit (port 5173)
   cd prototype1-circuit && npm run dev

   # Terminal 2 - Holographic (port 5174)
   cd prototype2-holographic && npm run dev -- --port 5174

   # Terminal 3 - Terminal (port 5175)
   cd prototype3-terminal && npm run dev -- --port 5175
   ```

---

### Method 3: Dynamic Theme Switcher (Advanced)

Create a theme switching mechanism in your app:

1. **Modify `src/App.jsx` to include theme state**
2. **Import all prototype CSS files conditionally**
3. **Add a theme selector UI component**

---

## 🎯 Recommended Workflow

### For Testing:
1. Use **Method 1** for quick previews
2. Test one prototype at a time
3. Take screenshots for comparison

### For Client Presentation:
1. Use **Method 2** to run all three simultaneously
2. Share three separate URLs for review
3. Deploy all three to different subdomains if needed

### For Production:
1. Choose your favorite prototype
2. Apply the CSS permanently
3. Delete or keep prototypes folder for future reference

---

## 📸 Taking Screenshots

For easy comparison:

```bash
# Open each in browser
# Circuit: http://localhost:5173
# Holographic: http://localhost:5174  
# Terminal: http://localhost:5175

# Take full-page screenshots and compare
```

---

## 🔧 Customization Tips

### Color Adjustments
All prototypes use CSS variables defined at the top of each file:
```css
:root {
  --bg-black: #000000;
  --text-red: #ff0000;
  --accent-red: #ff3333;
  /* etc... */
}
```

Modify these to adjust the color scheme while maintaining the design structure.

### Animation Speed
Search for `animation:` properties and adjust duration values:
```css
/* Slow down an animation */
animation: glow 3s infinite; /* Change 3s to 6s */
```

### Font Changes
Each prototype has specific font families. To change:
```css
/* In prototype CSS */
font-family: 'Your Preferred Font', fallback;
```

---

## ⚠️ Important Notes

1. **All prototypes maintain your existing content** - they only change the visual styling
2. **Certifications data is unchanged** - all your recent updates are preserved
3. **Responsive design included** - all prototypes work on mobile/tablet
4. **No JavaScript changes needed** - these are pure CSS variations

---

## 🚢 Deployment

Once you choose a prototype:

1. **Apply the chosen theme** (Method 1 above)
2. **Build the project:**
   ```bash
   npm run build
   ```
3. **Deploy to test site:**
   ```bash
   wsl bash aws-deployment-kit-patreon/aws-deployment-kit/scripts/deploy.sh gw-portfolio-498193834010 EAXH0JEBTNN6B z3r0
   ```
4. **Review at:** https://d1ntgw6m4z885c.cloudfront.net
5. **Deploy to production when satisfied**

---

## 📋 File Structure

```
src/
├── prototypes/
│   ├── README.md (this file)
│   ├── prototype1-circuit.css
│   ├── prototype2-holographic.css
│   ├── prototype3-terminal.css
│   ├── Hero-circuit.css
│   ├── Hero-holographic.css
│   └── Hero-terminal.css
├── index.css (current active theme)
└── components/
    └── Hero.css (current active hero theme)
```

---

## 🎨 Design Philosophy

Each prototype was designed with these principles:
- **Maintain brand identity** (black & red Tron Ares aesthetic)
- **Unique visual language** (no overlap between themes)
- **Professional quality** (production-ready code)
- **Performance optimized** (CSS-only animations)
- **Fully responsive** (mobile-first approach)

---

## 💡 Which Prototype to Choose?

### Choose Circuit Board if:
- You want a technical, engineering-focused feel
- Geometric precision appeals to you
- Your target audience is technical professionals
- You like sharp, angular designs

### Choose Holographic if:
- You want a premium, modern aesthetic
- Smooth animations and depth are important
- Your target audience values innovation
- You prefer rounded, soft designs

### Choose Terminal if:
- You work in cybersecurity or DevOps
- You want a retro/hacker aesthetic
- You like the CRT screen nostalgia
- Your target audience is technical/developer-focused

---

## 🆘 Troubleshooting

**Styles not applying?**
- Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
- Check that CSS files were copied correctly
- Restart dev server

**Animations too slow/fast?**
- Search for `animation:` in CSS files
- Adjust the duration value (e.g., `2s` → `4s`)

**Want to mix elements from different prototypes?**
- Copy specific CSS classes from one prototype to another
- Test thoroughly to avoid conflicts

---

## 📞 Questions?

All prototypes are fully functional and ready to deploy. Choose the one that best represents your professional brand and matches your target audience expectations.

**Happy designing! 🚀**
