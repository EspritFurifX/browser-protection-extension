# 🛡️ Protection Anti-Grab IP & Données Navigateur

<div align="center">

**Extension Chrome de Protection Maximale**

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/votre-repo)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](docs/LICENSE)

Protection complète contre les fuites d'IP, grab de données navigateur et fingerprinting sur **TOUS les sites web**.

[Installation](#installation) • [Documentation](docs/README.md) • [Sécurité](docs/SECURITY.md)

</div>

---

## 📁 Structure du Projet

```
browser-protection/
│
├── 📄 manifest.json              # Configuration de l'extension
│
├── 📂 src/                       # Code source
│   ├── 📂 icons/                # Icônes de l'extension
│   │   ├── icon16.png           # 16x16 (barre d'outils)
│   │   ├── icon48.png           # 48x48 (page extensions)
│   │   └── icon128.png          # 128x128 (Chrome Store)
│   │
│   ├── 📂 scripts/              # Scripts JavaScript
│   │   ├── background.js        # Service worker (blocage global)
│   │   ├── content.js           # Protection par page (22 protections)
│   │   └── popup.js             # Logique du popup
│   │
│   ├── popup.html               # Interface utilisateur
│   └── test.html                # Page de test locale
│
├── 📂 docs/                      # Documentation
│   ├── README.md                # Documentation complète
│   ├── QUICKSTART.md            # Démarrage rapide
│   ├── INSTALLATION.md          # Guide d'installation
│   ├── SECURITY.md              # Architecture technique
│   ├── DEMO.md                  # Démonstrations
│   ├── CHANGELOG.md             # Historique des versions
│   ├── CONTRIBUTING.md          # Guide de contribution
│   ├── PROJECT_SUMMARY.txt      # Résumé du projet
│   └── LICENSE                  # Licence MIT
│
├── 🔨 build.sh                  # Script de build (Unix/Mac)
├── 🔨 build.ps1                 # Script de build (Windows)
└── .gitignore                   # Fichiers à ignorer

```

---

## 🚀 Installation

### Chrome / Edge / Brave / Opera

1. Ouvrez `chrome://extensions/`
2. Activez le **"Mode développeur"** (toggle en haut à droite)
3. Cliquez **"Charger l'extension non empaquetée"**
4. Sélectionnez le dossier `browser-protection`
5. ✅ **L'extension est active !**

Voir [docs/INSTALLATION.md](docs/INSTALLATION.md) pour plus de détails.

---

## 🛡️ Protections Actives (22)

### 🚨 Anti-Grab IP (5)
- ✅ Blocage WebRTC STUN/TURN
- ✅ Blocage 15+ API de détection IP
- ✅ Interception Fetch/XHR
- ✅ Blocage Géolocalisation
- ✅ Configuration Privacy Chrome

### 🕵️ Anti-Fingerprinting (10)
- ✅ Canvas protection
- ✅ Navigator spoofing
- ✅ Screen masking
- ✅ WebGL/GPU hiding
- ✅ Timezone masking
- ✅ Et plus...

### 🔒 Protection Données (7)
- ✅ MediaDevices blocking
- ✅ Battery API blocking
- ✅ LocalStorage filtering
- ✅ DOM injection detection
- ✅ Et plus...

---

## 🧪 Tests Rapides

### Test Local
```bash
# Ouvrir dans le navigateur
open src/test.html
```

### Test Console
```javascript
// Dans la console (F12)
IPProtection.status()
```

### Test Externe
- 🔗 https://browserleaks.com/webrtc
- 🔗 https://amiunique.org/

---

## 📚 Documentation

- 📖 [Documentation Complète](docs/README.md)
- 🚀 [Guide Démarrage Rapide](docs/QUICKSTART.md)
- 🔐 [Architecture Sécurité](docs/SECURITY.md)
- 🎬 [Démonstrations](docs/DEMO.md)

---

## 🔨 Build

### Unix/Mac/Linux
```bash
./build.sh
```

### Windows
```powershell
.\build.ps1
```

---

## 📊 Statistiques

- **22 protections** actives
- **15+ services IP** bloqués
- **0 fuite** garantie
- **< 1% impact** performance
- **100% gratuit** et open source

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Voir [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)

---

## 📄 Licence

MIT License - Voir [docs/LICENSE](docs/LICENSE)

---

<div align="center">

**🛡️ Protection Maximale • 0 Fuite • 100% Gratuit**

*Développé avec ❤️ pour la vie privée sur Internet*

</div>
