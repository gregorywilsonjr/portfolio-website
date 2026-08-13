#!/bin/bash

###############################################################################
# Prototype Theme Switcher
# Quickly switch between the 3 portfolio design prototypes
###############################################################################

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

error() {
    echo -e "${RED}✗ $1${NC}" >&2
    exit 1
}

success() {
    echo -e "${GREEN}✓ $1${NC}"
}

info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Display menu
echo ""
echo "=========================================="
echo "  Portfolio Prototype Theme Switcher"
echo "=========================================="
echo ""
echo "Select a prototype to preview:"
echo ""
echo "  1) Circuit Board  - Hexagonal grid, circuit patterns"
echo "  2) Holographic    - Glass morphism, depth layers"
echo "  3) Terminal       - CRT screen, CLI aesthetic"
echo "  4) Restore Original"
echo "  0) Exit"
echo ""
read -p "Enter your choice (0-4): " choice

case $choice in
    1)
        PROTOTYPE="circuit"
        PROTOTYPE_NAME="Circuit Board"
        ;;
    2)
        PROTOTYPE="holographic"
        PROTOTYPE_NAME="Holographic"
        ;;
    3)
        PROTOTYPE="terminal"
        PROTOTYPE_NAME="Terminal"
        ;;
    4)
        info "Restoring original theme..."
        if [ -f "src/index.css.backup" ]; then
            cp src/index.css.backup src/index.css
            success "Restored index.css"
        else
            warning "No backup found for index.css"
        fi
        
        if [ -f "src/components/Hero.css.backup" ]; then
            cp src/components/Hero.css.backup src/components/Hero.css
            success "Restored Hero.css"
        else
            warning "No backup found for Hero.css"
        fi
        
        echo ""
        success "Original theme restored!"
        exit 0
        ;;
    0)
        info "Exiting..."
        exit 0
        ;;
    *)
        error "Invalid choice. Please select 0-4."
        ;;
esac

# Create backups if they don't exist
if [ ! -f "src/index.css.backup" ]; then
    info "Creating backup of original index.css..."
    cp src/index.css src/index.css.backup
    success "Backup created"
fi

if [ ! -f "src/components/Hero.css.backup" ]; then
    info "Creating backup of original Hero.css..."
    cp src/components/Hero.css src/components/Hero.css.backup
    success "Backup created"
fi

# Switch to selected prototype
info "Switching to $PROTOTYPE_NAME prototype..."

if [ ! -f "src/prototypes/prototype1-${PROTOTYPE}.css" ]; then
    error "Prototype CSS file not found: src/prototypes/prototype1-${PROTOTYPE}.css"
fi

if [ ! -f "src/prototypes/Hero-${PROTOTYPE}.css" ]; then
    error "Prototype Hero CSS file not found: src/prototypes/Hero-${PROTOTYPE}.css"
fi

# Apply prototype styles
cp "src/prototypes/prototype1-${PROTOTYPE}.css" src/index.css 2>/dev/null || \
cp "src/prototypes/prototype2-${PROTOTYPE}.css" src/index.css 2>/dev/null || \
cp "src/prototypes/prototype3-${PROTOTYPE}.css" src/index.css

cp "src/prototypes/Hero-${PROTOTYPE}.css" src/components/Hero.css

success "Applied $PROTOTYPE_NAME theme"

echo ""
echo "=========================================="
success "Theme switched to: $PROTOTYPE_NAME"
echo "=========================================="
echo ""
info "Run 'npm run dev' to preview the changes"
info "Run this script again and select option 4 to restore the original theme"
echo ""
