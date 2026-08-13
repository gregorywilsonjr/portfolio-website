# 🚀 Quick Start - Portfolio Prototypes

Three unique design variations of your portfolio, all maintaining the **black & red Tron Ares aesthetic**.

## ⚡ Super Quick Preview

**Windows (PowerShell):**
```powershell
.\switch-prototype.ps1
# Select option 1, 2, or 3
npm run dev
```

**Linux/Mac (Bash):**
```bash
bash switch-prototype.sh
# Select option 1, 2, or 3
npm run dev
```

Visit: `http://localhost:5173`

---

## 🎨 The Three Prototypes

### 1️⃣ Circuit Board
**Geometric • Technical • Sharp**
- Hexagonal grids and circuit traces
- Angular clipped corners
- Geometric animations
- Engineering-focused aesthetic

### 2️⃣ Holographic  
**Premium • Modern • Smooth**
- Glass morphism effects
- Iridescent gradients
- Smooth depth layers
- High-end innovative feel

### 3️⃣ Terminal
**Retro • Hacker • CRT**
- Scanline CRT effects
- Terminal CLI design
- Glitch animations
- Cybersecurity aesthetic

---

## 📋 Step-by-Step

1. **Choose a prototype to preview:**
   - Run the switcher script (see above)
   - Select option 1, 2, or 3

2. **Start dev server:**
   ```bash
   npm run dev
   ```

3. **View in browser:**
   - Open `http://localhost:5173`

4. **Try another prototype:**
   - Stop server (Ctrl+C)
   - Run switcher again
   - Choose different option
   - Restart server

5. **Restore original:**
   - Run switcher script
   - Select option 4

---

## 🚢 Deploy Your Favorite

Once you choose a prototype:

```bash
# Build
npm run build

# Deploy to test site
wsl bash aws-deployment-kit-patreon/aws-deployment-kit/scripts/deploy.sh gw-portfolio-498193834010 EAXH0JEBTNN6B z3r0

# View at: https://d1ntgw6m4z885c.cloudfront.net
```

---

## 📁 Files Created

```
my_personal_website/
├── switch-prototype.ps1          # Windows theme switcher
├── switch-prototype.sh            # Linux/Mac theme switcher
├── PROTOTYPES_QUICKSTART.md      # This file
└── src/
    └── prototypes/
        ├── README.md              # Full documentation
        ├── prototype1-circuit.css
        ├── prototype2-holographic.css
        ├── prototype3-terminal.css
        ├── Hero-circuit.css
        ├── Hero-holographic.css
        └── Hero-terminal.css
```

---

## 💡 Quick Tips

- **Your content is unchanged** - only visual styling differs
- **All certifications preserved** - including recent CISA update
- **Fully responsive** - works on all devices
- **No code changes** - pure CSS variations

---

## 🆘 Need Help?

See full documentation: `src/prototypes/README.md`

**Quick fixes:**
- Styles not showing? Hard refresh browser (Ctrl+Shift+R)
- Script not running? Make it executable: `chmod +x switch-prototype.sh`
- Want to restore? Run switcher and select option 4

---

**Ready to preview? Run the switcher script now! 🎨**
