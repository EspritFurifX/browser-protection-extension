# ═══════════════════════════════════════════════════════════════
# 🛡️ Script de Build Windows - Protection Anti-Grab IP & Données
# ═══════════════════════════════════════════════════════════════

Write-Host "🛡️  Build Extension - Protection Anti-Grab" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan

# Variables
$manifest = Get-Content manifest.json | ConvertFrom-Json
$version = $manifest.version
$buildDir = "build"
$packageName = "browser-protection-v$version"
$zipName = "$packageName.zip"

Write-Host "Version: $version" -ForegroundColor Blue
Write-Host ""

# Étape 1: Nettoyage
Write-Host "[1/5] Nettoyage des fichiers de build précédents..." -ForegroundColor Yellow
if (Test-Path $buildDir) {
    Remove-Item -Recurse -Force $buildDir
}
Get-ChildItem -Filter *.zip | Remove-Item -Force
Write-Host "✓ Nettoyage terminé" -ForegroundColor Green

# Étape 2: Création du dossier de build
Write-Host "[2/5] Création du dossier de build..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $buildDir -Force | Out-Null
Write-Host "✓ Dossier créé" -ForegroundColor Green

# Étape 3: Copie des fichiers nécessaires
Write-Host "[3/5] Copie des fichiers..." -ForegroundColor Yellow
Copy-Item "manifest.json" -Destination $buildDir
Copy-Item "src" -Destination $buildDir -Recurse
Copy-Item "README.md" -Destination $buildDir
Write-Host "✓ Fichiers copiés" -ForegroundColor Green

# Étape 4: Validation du manifest
Write-Host "[4/5] Validation du manifest.json..." -ForegroundColor Yellow
try {
    $testManifest = Get-Content "$buildDir\manifest.json" | ConvertFrom-Json
    Write-Host "✓ Manifest valide" -ForegroundColor Green
} catch {
    Write-Host "⚠ Erreur de validation du manifest" -ForegroundColor Red
    exit 1
}

# Étape 5: Création du ZIP
Write-Host "[5/5] Création du package ZIP..." -ForegroundColor Yellow
Compress-Archive -Path "$buildDir\*" -DestinationPath $zipName -Force
Write-Host "✓ Package créé: $zipName" -ForegroundColor Green

# Statistiques
$fileSize = (Get-Item $zipName).Length / 1KB
$fileSizeFormatted = "{0:N2} KB" -f $fileSize
$fileCount = (Get-ChildItem $buildDir).Count

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Build terminé avec succès !" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Package: $zipName" -ForegroundColor Blue
Write-Host "📏 Taille: $fileSizeFormatted" -ForegroundColor Blue
Write-Host "📄 Fichiers: $fileCount" -ForegroundColor Blue
Write-Host ""
Write-Host "📝 Prochaines étapes:" -ForegroundColor Yellow
Write-Host "   1. Testez l'extension dans Chrome"
Write-Host "   2. Allez sur chrome://extensions/"
Write-Host "   3. Activez le Mode développeur"
Write-Host "   4. Chargez le dossier $buildDir"
Write-Host "   5. Ou décompressez $zipName et chargez-le"
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
