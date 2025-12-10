#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# 📸 Script de Préparation des Assets pour Chrome Web Store
# ═══════════════════════════════════════════════════════════════

set -e

echo "📸 Préparation des assets pour Chrome Web Store"
echo "═══════════════════════════════════════════════════════════"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Dossier de sortie
ASSETS_DIR="store_assets"
mkdir -p "${ASSETS_DIR}/screenshots"
mkdir -p "${ASSETS_DIR}/icons"

echo ""
echo -e "${BLUE}Instructions:${NC}"
echo "1. Prends des captures d'écran de l'extension en action"
echo "2. Sauvegarde-les dans ${ASSETS_DIR}/screenshots/"
echo "3. Nomme-les : screenshot_1.png, screenshot_2.png, etc."
echo ""

# Vérifier sips (macOS)
if ! command -v sips &> /dev/null; then
    echo -e "${RED}❌ sips non trouvé (outil macOS)${NC}"
    echo "Sur Linux, utilise ImageMagick : sudo apt-get install imagemagick"
    exit 1
fi

echo -e "${YELLOW}[1/4]${NC} Copie des icônes existantes..."
cp src/icons/icon16.png "${ASSETS_DIR}/icons/"
cp src/icons/icon48.png "${ASSETS_DIR}/icons/"
cp src/icons/icon128.png "${ASSETS_DIR}/icons/"
echo -e "${GREEN}✓${NC} Icônes copiées"

echo -e "${YELLOW}[2/4]${NC} Création de l'icône promotionnelle 440x280..."
sips -z 280 440 src/icons/icon128.png --out "${ASSETS_DIR}/icons/promo_440x280.png" > /dev/null 2>&1
echo -e "${GREEN}✓${NC} Icône promo créée"

echo -e "${YELLOW}[3/4]${NC} Vérification des captures d'écran..."
SCREENSHOT_COUNT=$(ls -1 "${ASSETS_DIR}/screenshots/"*.png 2>/dev/null | wc -l | xargs)

if [ "$SCREENSHOT_COUNT" -eq 0 ]; then
    echo -e "${YELLOW}⚠${NC}  Aucune capture trouvée dans ${ASSETS_DIR}/screenshots/"
    echo ""
    echo -e "${BLUE}Pour créer des captures:${NC}"
    echo "1. Ouvre l'extension et le popup"
    echo "2. Va sur test.html et lance les tests"
    echo "3. Va sur browserleaks.com/webrtc"
    echo "4. Prends des captures (Cmd+Shift+4 sur Mac)"
    echo "5. Place-les dans ${ASSETS_DIR}/screenshots/"
    echo "6. Relance ce script"
else
    echo -e "${GREEN}✓${NC} ${SCREENSHOT_COUNT} capture(s) trouvée(s)"
    
    echo -e "${YELLOW}[4/4]${NC} Redimensionnement des captures en 1280x800..."
    
    for file in "${ASSETS_DIR}/screenshots/"*.png; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            echo "  Redimensionnement: $filename"
            sips -z 800 1280 "$file" --out "${ASSETS_DIR}/screenshots/resized_$filename" > /dev/null 2>&1
        fi
    done
    
    echo -e "${GREEN}✓${NC} Captures redimensionnées (prefix: resized_)"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo -e "${GREEN}✅ Assets préparés !${NC}"
echo ""
echo -e "${BLUE}Dossier:${NC} ${ASSETS_DIR}/"
echo ""
echo -e "${BLUE}Fichiers prêts:${NC}"
ls -lh "${ASSETS_DIR}/icons/"
echo ""

if [ "$SCREENSHOT_COUNT" -gt 0 ]; then
    echo -e "${BLUE}Captures (minimum 1, recommandé 5):${NC}"
    ls -lh "${ASSETS_DIR}/screenshots/resized_"*.png 2>/dev/null || echo "Aucune capture redimensionnée"
    echo ""
fi

echo -e "${YELLOW}📝 Prochaine étape:${NC}"
echo "1. Vérifie les captures dans ${ASSETS_DIR}/screenshots/"
echo "2. Va sur https://chrome.google.com/webstore/devconsole"
echo "3. Suis le guide: docs/PUBLICATION.md"
echo ""
echo "═══════════════════════════════════════════════════════════"
