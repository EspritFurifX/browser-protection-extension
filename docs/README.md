<div align="center">

# 🛡️ Protection Anti-Grab IP & Données Navigateur

### Extension Chrome de Protection Maximale

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/votre-repo)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Chrome](https://img.shields.io/badge/Chrome-88%2B-red.svg)](https://www.google.com/chrome/)
[![Protection](https://img.shields.io/badge/protection-20%2B-brightgreen.svg)](#protections-actives)

**Protection MAXIMALE** contre toute forme de récupération de données personnelles, fuites d'IP, fingerprinting et tracking sur **TOUS les sites web**.

[Installation](#-installation) • [Fonctionnalités](#-fonctionnalités) • [Tests](#-test--utilisation) • [Documentation](SECURITY.md)

</div>

---

## 🔥 Fonctionnalités

### 🚨 Protection contre le Grab d'IP
- ✅ **Blocage WebRTC** - Empêche les fuites d'IP via WebRTC (candidats STUN/TURN)
- ✅ **Blocage API IP** - Bloque toutes les requêtes vers les services de détection d'IP (ipapi, ipify, etc.)
- ✅ **Blocage Géolocalisation** - Désactive complètement l'accès à votre position
- ✅ **Protection DNS** - Empêche les requêtes DNS qui révèlent votre position

### 🕵️ Protection contre le Fingerprinting
- ✅ **Canvas Fingerprinting** - Ajoute du bruit aux données canvas
- ✅ **Navigator Spoofing** - Falsifie les informations du navigateur
- ✅ **Screen Masking** - Masque les vraies dimensions de l'écran
- ✅ **GPU/WebGL** - Cache les informations de la carte graphique
- ✅ **Timezone & Langue** - Masque votre fuseau horaire et langue réelle
- ✅ **Plugins & Fonts** - Cache la liste des plugins et polices installées

### 🔒 Protection des Données
- ✅ **MediaDevices** - Empêche l'énumération de caméra/micro
- ✅ **Battery API** - Bloque l'accès aux informations de batterie
- ✅ **LocalStorage** - Filtre les écritures suspectes
- ✅ **Console Protection** - Empêche console.clear()
- ✅ **DOM Injection** - Détecte et supprime les éléments malveillants

## 🚀 Installation

### Chrome / Edge / Brave / Opera :

1. Ouvrez `chrome://extensions/`
2. Activez le **"Mode développeur"** (toggle en haut à droite)
3. Cliquez sur **"Charger l'extension non empaquetée"**
4. Sélectionnez ce dossier (`browser-protection`)
5. ✅ **L'extension est active !**

### Firefox :

1. Ouvrez `about:debugging#/runtime/this-firefox`
2. Cliquez sur **"Charger un module complémentaire temporaire"**
3. Sélectionnez le fichier `manifest.json`
4. ✅ **L'extension est active !**

## 🧪 Test & Utilisation

### 1. Vérification visuelle
- Cliquez sur l'icône de l'extension dans la barre d'outils
- Une popup s'ouvre avec les statistiques en temps réel
- Le badge affiche le nombre total de menaces bloquées

### 2. Test dans la console
1. Allez sur n'importe quel site web
2. Ouvrez la console (F12)
3. Vous verrez :
   ```
   🛡️ PROTECTION MAXIMALE ACTIVE sur example.com
   ✅ PROTECTION MAXIMALE ACTIVÉE
   ```

### 3. Commandes disponibles

```javascript
// Afficher le statut complet de la protection
IPProtection.status()

// Obtenir les statistiques
IPProtection.getStats()

// Réinitialiser les statistiques
IPProtection.clearStats()
```

### 4. Test de fuite d'IP

Testez l'efficacité de la protection :

1. **Sans protection** : Allez sur https://browserleaks.com/webrtc
2. **Activez l'extension**
3. **Rechargez la page** - Vous verrez que votre IP réelle n'est plus exposée
4. Vérifiez la console : des messages "IP LEAK BLOQUÉE" s'afficheront

## 📊 Statistiques en Temps Réel

Ouvrez le popup de l'extension pour voir :

- 🚨 **Menaces bloquées totales**
- 🔒 **Fuites WebRTC/IP bloquées**
- 👁️ **Tentatives de fingerprinting**
- 🌐 **Requêtes IP API bloquées**
- 💉 **Injections DOM bloquées**
- ⏱️ **Temps d'activité**

## 🎯 Page de Test Intégrée

**Utilisez notre page de test locale** :

1. Ouvrez le fichier `test.html` dans votre navigateur
2. Cliquez sur "Lancer Tous les Tests"
3. Observez les résultats en temps réel

**Sites de test externes** :

1. **WebRTC Leak Test** : https://browserleaks.com/webrtc
2. **IP Detection** : https://www.whatismyip.com
3. **Canvas Fingerprinting** : https://browserleaks.com/canvas
4. **Device Fingerprinting** : https://amiunique.org

## 🛡️ Liste Complète des Protections

### Niveau 1 : Blocage IP
- WebRTC STUN/TURN candidates
- Requêtes vers ipapi.co, ipify.org, ip-api.com, etc.
- XMLHttpRequest & Fetch vers services IP
- Géolocalisation API

### Niveau 2 : Anti-Fingerprinting
- Canvas toDataURL / toBlob / getImageData
- Navigator (platform, hardwareConcurrency, deviceMemory)
- Screen dimensions & color depth
- WebGL renderer info
- Timezone offset
- Language & languages

### Niveau 3 : Protection Données
- MediaDevices enumeration
- Battery API
- DOM MutationObserver (éléments suspects)
- LocalStorage filtering
- Console.clear() prevention

## 🚀 Performance

L'extension est conçue pour être :
- **Légère** - Aucun impact sur la vitesse de navigation
- **Transparente** - Fonctionne en arrière-plan
- **Compatible** - Fonctionne sur tous les sites web
- **Sécurisée** - Aucune collecte de données

## 📈 Statistiques Avancées

```javascript
// Exemple de sortie
IPProtection.getStats()
// {
//   site: "example.com",
//   webRTCBlocked: 15,
//   domBlocked: 3,
//   fingerprintAttempts: 42,
//   protectionActive: true,
//   timestamp: "2025-12-10T..."
// }
```

## ⚠️ Notes

- L'extension se charge **avant** tout autre script sur la page
- Elle fonctionne sur **tous les sites** que vous visitez
- Aucun impact sur les performances
- Totalement gratuite et open source

## 🔧 Désinstallation

Chrome/Edge: `chrome://extensions/` → Retirer l'extension
Firefox: `about:addons` → Retirer l'extension
