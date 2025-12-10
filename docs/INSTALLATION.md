# 🚀 Installation Rapide - 3 Minutes

## Étape 1️⃣ : Télécharger l'Extension

Vous avez déjà le dossier `browser-protection` ? Parfait ! Sinon :
- Clonez depuis GitHub : `git clone [url-du-repo]`
- Ou téléchargez le ZIP et extrayez-le

## Étape 2️⃣ : Ouvrir les Extensions Chrome

### Pour Chrome, Edge, Brave, Opera :

1. **Ouvrez votre navigateur**

2. **Tapez dans la barre d'adresse** :
   ```
   chrome://extensions/
   ```
   Ou utilisez le menu : `⋮` → `Extensions` → `Gérer les extensions`

3. **Activez le "Mode développeur"**
   - Recherchez le toggle en haut à droite
   - Cliquez pour activer (devient bleu/vert)

## Étape 3️⃣ : Charger l'Extension

1. **Cliquez sur "Charger l'extension non empaquetée"**
   - Bouton en haut à gauche
   - Une fenêtre de sélection s'ouvre

2. **Sélectionnez le dossier `browser-protection`**
   - Naviguez jusqu'au dossier
   - Cliquez sur "Sélectionner le dossier"

3. **Vérification**
   - L'extension apparaît dans la liste
   - Le badge affiche "ON" (vert)
   - Icône 🛡️ visible dans la barre d'outils

## Étape 4️⃣ : Configuration Initiale

1. **Épingler l'extension**
   - Cliquez sur l'icône puzzle (extensions) dans la barre
   - Trouvez "Protection Anti-Grab IP & Données"
   - Cliquez sur l'épingle 📌

2. **Tester l'extension**
   - Ouvrez `test.html` dans votre navigateur
   - Ou allez sur https://browserleaks.com/webrtc
   - Cliquez sur le popup de l'extension

## ✅ Vérification Complète

### Dans la Console du Navigateur (F12)

Ouvrez n'importe quel site et appuyez sur F12, vous devriez voir :

```
🛡️ PROTECTION MAXIMALE ACTIVE sur example.com
✅ PROTECTION MAXIMALE ACTIVÉE
ℹ️ Tapez IPProtection.status() pour voir le statut complet
```

### Testez la Commande

Dans la console, tapez :
```javascript
IPProtection.status()
```

Vous devriez voir un rapport complet avec :
- Site protégé
- Statistiques de blocage
- Liste des protections actives

---

## 🔧 Installation Firefox (Temporaire)

### Pour Firefox :

1. **Ouvrez Firefox**

2. **Tapez dans la barre d'adresse** :
   ```
   about:debugging#/runtime/this-firefox
   ```

3. **Cliquez sur "Charger un module complémentaire temporaire"**

4. **Sélectionnez le fichier `manifest.json`**
   - Naviguez jusqu'au dossier `browser-protection`
   - Sélectionnez `manifest.json`

5. **L'extension est maintenant active**
   - Valable jusqu'à la fermeture de Firefox
   - Rechargez-la à chaque démarrage

### Note Firefox
Pour une installation permanente sur Firefox, l'extension doit être signée par Mozilla. Utilisez la méthode temporaire pour le développement.

---

## 🎯 Vérification Rapide

### Test en 30 Secondes

1. **Ouvrez le popup** (cliquez sur l'icône 🛡️)
   - Voyez-vous l'interface avec les statistiques ?
   - Le statut est-il "ACTIF" ?

2. **Ouvrez test.html**
   - Cliquez sur "Lancer Tous les Tests"
   - Voyez-vous des protections actives ? ✅

3. **Test WebRTC externe**
   - Allez sur https://browserleaks.com/webrtc
   - Votre IP publique doit être masquée
   - Vérifiez la console : messages de blocage

---

## ❌ Problèmes Courants

### Erreur: "Manifest version not supported"
**Solution** : Utilisez Chrome 88+ ou Edge 88+

### Erreur: "Cannot read property of undefined"
**Solution** : 
1. Désactivez l'extension
2. Supprimez-la
3. Rechargez la page chrome://extensions/
4. Réinstallez l'extension

### L'extension n'apparaît pas
**Solution** :
1. Vérifiez que le Mode développeur est activé
2. Vérifiez que vous avez sélectionné le BON dossier
3. Le dossier doit contenir `manifest.json`

### Badge n'affiche rien
**Solution** :
1. Rechargez l'extension
2. Fermez tous les onglets
3. Rouvrez le navigateur

---

## 🔄 Mise à Jour de l'Extension

### Après avoir modifié le code :

1. **Retournez sur chrome://extensions/**
2. **Trouvez l'extension**
3. **Cliquez sur l'icône de rechargement** 🔄
4. **Rechargez vos onglets** (Ctrl+R)

---

## 🎉 Installation Réussie !

Si vous voyez :
- ✅ Badge "ON" vert
- ✅ Popup qui s'ouvre
- ✅ Messages dans la console
- ✅ Tests qui passent

**Félicitations ! Votre protection est active.**

### Prochaines Étapes

1. **Testez sur vos sites favoris**
2. **Ouvrez la console pour voir les blocages**
3. **Consultez les statistiques dans le popup**
4. **Lisez SECURITY.md pour comprendre comment ça marche**

---

## 📱 Besoin d'Aide ?

- 📖 Lisez le README.md complet
- 🔐 Consultez SECURITY.md pour la documentation technique
- 📋 Vérifiez CHANGELOG.md pour les nouveautés
- 🐛 Ouvrez une issue sur GitHub

---

**🛡️ Bonne navigation sécurisée !**
