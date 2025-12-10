# 📦 Guide de Publication - Chrome Web Store

Guide complet pour publier **Protection Anti-Grab IP & Données** sur le Chrome Web Store.

---

## 📋 Prérequis

### 1. Compte Google
- ✅ Compte Google actif
- ✅ Carte bancale (frais d'inscription unique : **5 USD**)

### 2. Fichiers Requis
- ✅ Extension packagée (ZIP)
- ✅ Icônes aux bonnes dimensions
- ✅ Captures d'écran
- ✅ Description marketing

---

## 🎯 Étape 1 : Préparer l'Extension

### A. Créer le Package ZIP

```bash
# Sur Mac/Linux
./build.sh

# Sur Windows
.\build.ps1
```

Cela crée : `browser-protection-v2.0.0.zip`

### B. Vérifier le Contenu

Le ZIP doit contenir :
```
browser-protection/
├── manifest.json
├── README.md
└── src/
    ├── icons/
    ├── scripts/
    ├── popup.html
    └── test.html
```

⚠️ **Ne PAS inclure** :
- ❌ Fichiers `.git`
- ❌ `node_modules/`
- ❌ Fichiers de développement
- ❌ Documentation complète (seulement README.md)

---

## 🎨 Étape 2 : Préparer les Assets

### A. Icônes Requises

Déjà prêtes dans `src/icons/` :
- ✅ **16x16** : `icon16.png` (barre d'outils)
- ✅ **48x48** : `icon48.png` (page extensions)
- ✅ **128x128** : `icon128.png` (Chrome Web Store)

### B. Captures d'Écran (IMPORTANT)

Le Chrome Web Store exige **au minimum 1 capture**, recommandé **5 captures** :

**Dimensions requises :**
- **1280x800** ou **640x400** (ratio 16:10)

**Suggestions de captures :**

1. **Capture 1** : Popup avec statistiques
   - Montrer l'interface du popup
   - Statistiques de protection en action
   - Badge avec menaces bloquées

2. **Capture 2** : Test WebRTC sur browserleaks.com
   - Montrer "No Leak" 
   - Comparer avant/après

3. **Capture 3** : Console avec messages de protection
   - Logs de blocage WebRTC
   - Messages de fingerprinting bloqué

4. **Capture 4** : Page de test locale (test.html)
   - Tous les tests qui passent
   - Interface des tests

5. **Capture 5** : Site fonctionnel (Azar, etc.)
   - Montrer que le site fonctionne normalement
   - Protection active en arrière-plan

**Comment prendre les captures :**

```bash
# Sur Mac
Cmd + Shift + 4
# Puis sélectionner la zone

# Redimensionner avec ImageMagick ou sips
sips -z 800 1280 screenshot.png --out screenshot_1280x800.png
```

### C. Icône Promotionnelle (Store)

**Optionnel mais recommandé :**
- **440x280** pixels (format promo)
- Utilisable pour la promotion dans le Store

```bash
# Créer depuis ton logo
sips -z 280 440 src/icons/icon128.png --out promo_440x280.png
```

### D. Petite Icône Promo (Store)

**Optionnel :**
- **128x128** (déjà disponible : `icon128.png`)

---

## 🚀 Étape 3 : Inscription au Chrome Web Store

### 1. Aller sur le Developer Dashboard

🔗 https://chrome.google.com/webstore/devconsole

### 2. Créer un Compte Développeur

- Cliquer sur **"S'inscrire"**
- Payer les **5 USD** (frais unique à vie)
- Accepter les conditions d'utilisation

### 3. Créer un Nouveau Item

- Cliquer sur **"New Item"**
- Uploader le fichier **`browser-protection-v2.0.0.zip`**
- Attendre la validation du fichier

---

## 📝 Étape 4 : Remplir les Informations

### A. Store Listing (Informations Principales)

#### **Nom de l'Extension**
```
Protection Anti-Grab IP & Données
```

#### **Description Courte** (132 caractères max)
```
Protection maximale contre les fuites d'IP WebRTC, fingerprinting et grab de données sur tous les sites web.
```

#### **Description Détaillée** (recommandé : 500-1000 mots)

```markdown
🛡️ PROTECTION ANTI-GRAB IP & DONNÉES NAVIGATEUR

Protection complète contre toute forme de récupération de données personnelles, fuites d'IP, fingerprinting et tracking sur TOUS les sites web.

🚨 PROTECTION CONTRE LE GRAB D'IP

✅ Blocage WebRTC - Empêche les fuites d'IP via WebRTC (candidats STUN/TURN)
✅ Blocage API IP - Bloque toutes les requêtes vers les services de détection d'IP (ipapi, ipify, ipinfo, etc.)
✅ Blocage Géolocalisation - Désactive complètement l'accès à votre position
✅ Protection DNS - Empêche les requêtes DNS révélatrices

🕵️ PROTECTION CONTRE LE FINGERPRINTING

✅ Canvas Fingerprinting - Ajoute du bruit aux données canvas
✅ Navigator Spoofing - Falsifie les informations du navigateur (platform, hardware, etc.)
✅ Screen Masking - Masque les vraies dimensions de l'écran
✅ GPU/WebGL - Cache les informations de la carte graphique
✅ Timezone & Langue - Masque votre fuseau horaire et langue réelle
✅ Plugins & Fonts - Cache la liste des plugins et polices installées

🔒 PROTECTION DES DONNÉES

✅ MediaDevices - Empêche l'énumération de caméra/micro
✅ Battery API - Bloque l'accès aux informations de batterie
✅ LocalStorage - Filtre les écritures suspectes
✅ DOM Injection - Détecte et supprime les éléments malveillants

📊 STATISTIQUES EN TEMPS RÉEL

• Interface popup moderne avec compteurs
• Badge dynamique affichant les menaces bloquées
• Console enrichie avec logs détaillés
• API JavaScript pour développeurs

🧪 TESTÉ ET VÉRIFIÉ

✅ Test WebRTC : https://browserleaks.com/webrtc
✅ Fingerprinting : https://amiunique.org
✅ Canvas : https://browserleaks.com/canvas

⚡ PERFORMANCE

• Impact CPU : < 1%
• Impact RAM : +2 MB
• Compatible avec tous les sites web
• Aucune collecte de données
• 100% Open Source

🎯 UTILISATION

Après installation, l'extension fonctionne automatiquement en arrière-plan. Cliquez sur l'icône pour voir les statistiques en temps réel.

Dans la console (F12), tapez : IPProtection.status()

⚠️ NOTE IMPORTANTE

Cette extension bloque les fuites WebRTC et le fingerprinting côté client. Pour masquer complètement votre IP au niveau réseau, utilisez un VPN en complément.

🤝 OPEN SOURCE

Code source disponible sur GitHub. Contributions bienvenues !
```

#### **Catégorie**
- **Principale** : `Privacy & Security`
- **Secondaire** : `Developer Tools`

#### **Langue**
- Français (fr)
- Anglais (en) - recommandé d'ajouter une traduction

### B. Uploads Graphiques

1. **Icône** : `src/icons/icon128.png` (déjà dans le ZIP)
2. **Captures d'écran** : Upload 5 images 1280x800
3. **Icône promo** (optionnel) : 440x280
4. **Petite icône promo** (optionnel) : 128x128

### C. Confidentialité

#### **Politique de Confidentialité**

**Option 1** : Créer une page web simple

```html
<!DOCTYPE html>
<html>
<head>
    <title>Politique de Confidentialité - Protection Anti-Grab</title>
</head>
<body>
    <h1>Politique de Confidentialité</h1>
    
    <h2>Collecte de Données</h2>
    <p>Cette extension NE collecte, NE stocke, et NE transmet AUCUNE donnée personnelle.</p>
    
    <h2>Permissions Utilisées</h2>
    <ul>
        <li><strong>storage</strong> : Stockage local des statistiques (uniquement sur votre appareil)</li>
        <li><strong>declarativeNetRequest</strong> : Blocage des requêtes vers les services de détection d'IP</li>
        <li><strong>privacy</strong> : Configuration des paramètres de confidentialité Chrome</li>
        <li><strong>all_urls</strong> : Protection sur tous les sites web</li>
    </ul>
    
    <h2>Données Stockées Localement</h2>
    <p>Uniquement des compteurs de menaces bloquées, stockés localement sur votre navigateur.</p>
    
    <h2>Connexions Externes</h2>
    <p>AUCUNE connexion vers des serveurs externes. Le code est 100% local.</p>
    
    <h2>Code Open Source</h2>
    <p>Le code est entièrement open source et auditable sur GitHub.</p>
    
    <h2>Contact</h2>
    <p>Email : votre-email@example.com</p>
</body>
</html>
```

**Option 2** : Utiliser GitHub Pages (gratuit)

```bash
# Créer une branche gh-pages
git checkout -b gh-pages
echo "Privacy policy content" > privacy.html
git add privacy.html
git commit -m "Add privacy policy"
git push origin gh-pages
```

URL : `https://votre-username.github.io/browser-protection/privacy.html`

#### **Justification des Permissions**

Le Chrome Web Store demande de justifier chaque permission :

```
storage:
Utilisé pour sauvegarder les statistiques de protection localement (compteurs de menaces bloquées).

declarativeNetRequest:
Utilisé pour bloquer les requêtes vers les services de détection d'IP (ipapi.co, ipify.org, etc.).

declarativeNetRequestFeedback:
Utilisé pour obtenir des retours sur les règles de blocage appliquées.

privacy:
Utilisé pour configurer les paramètres de confidentialité Chrome (webRTCIPHandlingPolicy, etc.).

host_permissions (<all_urls>):
Nécessaire pour protéger l'utilisateur sur tous les sites web qu'il visite.
```

---

## ✅ Étape 5 : Distribution

### A. Visibilité

Choisir :
- **Public** : Visible par tous (recommandé)
- **Non listé** : Seulement via lien direct
- **Privé** : Seulement pour testeurs

### B. Pays

Cocher tous les pays ou sélectionner spécifiquement.

### C. Tarification

- **Gratuit** (recommandé)

---

## 🔍 Étape 6 : Soumission et Review

### 1. Vérifier Tout

- ✅ ZIP uploadé
- ✅ Captures d'écran (minimum 1, recommandé 5)
- ✅ Description complète
- ✅ Politique de confidentialité
- ✅ Permissions justifiées

### 2. Soumettre pour Review

- Cliquer sur **"Submit for Review"**
- Délai de review : **1-3 jours ouvrables** (parfois plus)

### 3. Attendre la Validation

Google va vérifier :
- ✅ Respect des politiques
- ✅ Aucun malware
- ✅ Permissions justifiées
- ✅ Description exacte

---

## 📧 Étape 7 : Après Publication

### A. Mise à Jour

Pour publier une nouvelle version :

1. Modifier `manifest.json` :
```json
"version": "2.1.0"
```

2. Créer nouveau ZIP avec `./build.sh`

3. Uploader sur le Dashboard

4. Soumettre pour review

### B. Statistiques

Accessible dans le Dashboard :
- Nombre d'utilisateurs
- Installations/désinstallations
- Notes et avis
- Crashes

### C. Répondre aux Avis

Important pour le référencement !

---

## ⚠️ Politiques Importantes

### À NE PAS FAIRE

❌ Demander plus de permissions que nécessaire
❌ Collecter des données sans le dire
❌ Modifier des pages sans raison
❌ Publicité intrusive
❌ Code obfusqué (sauf si justifié)

### À FAIRE

✅ Code clair et lisible
✅ Description honnête
✅ Permissions justifiées
✅ Politique de confidentialité claire
✅ Open source (bonus de confiance)

---

## 🎯 Checklist Finale

Avant de soumettre :

- [ ] ZIP créé et testé
- [ ] 5 captures d'écran 1280x800
- [ ] Description complète et honnête
- [ ] Politique de confidentialité en ligne
- [ ] Permissions justifiées
- [ ] Icônes validées
- [ ] Extension testée sur plusieurs sites
- [ ] Aucune erreur dans la console
- [ ] README.md à jour dans le ZIP

---

## 💰 Coûts

- **Inscription développeur** : 5 USD (une fois)
- **Hébergement** : Gratuit
- **Mises à jour** : Gratuites
- **Total** : **5 USD**

---

## 📞 Support

En cas de rejet :
1. Lire attentivement l'email de Google
2. Corriger les problèmes mentionnés
3. Resoumettre

Délai de re-review : 24-48h

---

## 🔗 Liens Utiles

- **Developer Dashboard** : https://chrome.google.com/webstore/devconsole
- **Documentation** : https://developer.chrome.com/docs/webstore/
- **Politiques** : https://developer.chrome.com/docs/webstore/program-policies/
- **Support** : https://support.google.com/chrome_webstore/

---

## 🎉 Félicitations !

Une fois publiée, ton extension sera accessible via :
```
https://chrome.google.com/webstore/detail/[ID-UNIQUE]
```

Partage ce lien pour que les utilisateurs puissent l'installer ! 🚀

---

**Bonne chance pour la publication ! 🛡️**
