#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# 🛡️ Script de Build - Protection Anti-Grab IP & Données
# ═══════════════════════════════════════════════════════════════

set -e

echo "🛡️  Build Extension - Protection Anti-Grab"
echo "═══════════════════════════════════════════════════════════"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Variables
VERSION=$(grep '"version"' manifest.json | sed -E 's/.*"version": "(.*)".*/\1/')
BUILD_DIR="build"
PACKAGE_NAME="browser-protection-v${VERSION}"
ZIP_NAME="${PACKAGE_NAME}.zip"

echo -e "${BLUE}Version:${NC} ${VERSION}"
echo ""

# Étape 1: Nettoyage
echo -e "${YELLOW}[1/5]${NC} Nettoyage des fichiers de build précédents..."
rm -rf "${BUILD_DIR}"
rm -f *.zip
echo -e "${GREEN}✓${NC} Nettoyage terminé"

# Étape 2: Création du dossier de build
echo -e "${YELLOW}[2/5]${NC} Création du dossier de build..."
mkdir -p "${BUILD_DIR}"
echo -e "${GREEN}✓${NC} Dossier créé"

# Étape 3: Copie des fichiers nécessaires
echo -e "${YELLOW}[3/5]${NC} Copie des fichiers..."
cp manifest.json "${BUILD_DIR}/"
cp -r src "${BUILD_DIR}/"
cp README.md "${BUILD_DIR}/"
echo -e "${GREEN}✓${NC} Fichiers copiés"

# Étape 4: Validation du manifest
echo -e "${YELLOW}[4/5]${NC} Validation du manifest.json..."
if command -v jq &> /dev/null; then
    cat "${BUILD_DIR}/manifest.json" | jq . > /dev/null
    echo -e "${GREEN}✓${NC} Manifest valide"
else
    echo -e "${YELLOW}⚠${NC}  jq non installé, validation JSON ignorée"
fi

# Étape 5: Création du ZIP
echo -e "${YELLOW}[5/5]${NC} Création du package ZIP..."
cd "${BUILD_DIR}"
zip -r "../${ZIP_NAME}" . -q
cd ..
echo -e "${GREEN}✓${NC} Package créé: ${ZIP_NAME}"

# Statistiques
FILE_SIZE=$(du -h "${ZIP_NAME}" | cut -f1)
FILE_COUNT=$(unzip -l "${ZIP_NAME}" | tail -1 | awk '{print $2}')

echo ""
echo "═══════════════════════════════════════════════════════════"
echo -e "${GREEN}✅ Build terminé avec succès !${NC}"
echo ""
echo -e "${BLUE}📦 Package:${NC} ${ZIP_NAME}"
echo -e "${BLUE}📏 Taille:${NC} ${FILE_SIZE}"
echo -e "${BLUE}📄 Fichiers:${NC} ${FILE_COUNT}"
echo ""
echo -e "${YELLOW}📝 Prochaines étapes:${NC}"
echo "   1. Testez l'extension dans Chrome"
echo "   2. Allez sur chrome://extensions/"
echo "   3. Activez le Mode développeur"
echo "   4. Chargez le dossier ${BUILD_DIR}"
echo "   5. Ou décompressez ${ZIP_NAME} et chargez-le"
echo ""
echo "═══════════════════════════════════════════════════════════"
