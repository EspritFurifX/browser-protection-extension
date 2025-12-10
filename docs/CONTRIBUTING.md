# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer à la **Protection Anti-Grab IP & Données** !

## 🎯 Comment Contribuer

### Signaler un Bug 🐛

1. **Vérifiez** que le bug n'a pas déjà été signalé
2. **Ouvrez une issue** avec le template suivant :

```markdown
**Description du bug**
Description claire et concise du problème

**Étapes pour reproduire**
1. Aller sur '...'
2. Cliquer sur '...'
3. Voir l'erreur

**Comportement attendu**
Ce qui devrait se passer normalement

**Captures d'écran**
Si applicable, ajouter des captures

**Environnement**
- Navigateur: [Chrome 120]
- OS: [macOS 14.0]
- Version extension: [2.0.0]

**Console logs**
```
Copier les messages d'erreur de la console
```
```

### Suggérer une Fonctionnalité 💡

1. **Ouvrez une issue** avec le label `enhancement`
2. **Décrivez** la fonctionnalité demandée
3. **Expliquez** pourquoi elle serait utile
4. **Proposez** une implémentation si possible

### Soumettre une Pull Request 🚀

#### Prérequis
```bash
# Forker le repo
# Cloner votre fork
git clone https://github.com/votre-username/browser-protection.git
cd browser-protection

# Créer une branche
git checkout -b feature/ma-fonctionnalite
```

#### Développement

1. **Faire vos changements**
   - Suivre le style de code existant
   - Commenter le code complexe
   - Tester localement

2. **Tester**
   ```bash
   # Charger l'extension dans Chrome
   # Tester sur différents sites
   # Vérifier la console pour les erreurs
   # Ouvrir test.html et tester
   ```

3. **Committer**
   ```bash
   git add .
   git commit -m "feat: Ajouter protection contre XYZ"
   ```

4. **Push**
   ```bash
   git push origin feature/ma-fonctionnalite
   ```

5. **Ouvrir une PR**
   - Aller sur GitHub
   - Cliquer "New Pull Request"
   - Remplir le template

## 📝 Standards de Code

### JavaScript

```javascript
// ✅ BON
function blockIPLeak(candidate) {
    if (!candidate || !candidate.candidate) {
        return false;
    }
    
    const fields = candidate.candidate.split(' ');
    return fields[7] === 'srflx';
}

// ❌ MAUVAIS
function blockIPLeak(candidate){
  if(!candidate||!candidate.candidate)return false;
  const fields=candidate.candidate.split(' ');
  return fields[7]==='srflx';
}
```

### Conventions de Nommage

```javascript
// Variables : camelCase
let blockedCount = 0;
const MAX_ATTEMPTS = 100;

// Fonctions : camelCase + verbe
function checkSuspiciousElement(element) { }
function getProtectionStats() { }

// Constantes : UPPER_SNAKE_CASE
const BLOCKED_DOMAINS = ['ipapi.co', 'ipify.org'];
const DEFAULT_TIMEOUT = 5000;
```

### Commentaires

```javascript
// ═══════════════════════════════════════════════════════
// Section Title
// ═══════════════════════════════════════════════════════

// Explication concise de ce que fait le code
function doSomething() {
    // Commentaire inline si nécessaire
    const result = complexOperation();
    return result;
}
```

## 🧪 Tests

### Tests Manuels Obligatoires

Avant de soumettre une PR, tester sur :

- [ ] Chrome (dernière version)
- [ ] Edge (dernière version)
- [ ] Brave (dernière version)
- [ ] Sites : browserleaks.com, amiunique.org
- [ ] test.html (tous les tests passent)
- [ ] Console : aucune erreur

### Checklist PR

- [ ] Le code fonctionne sans erreur
- [ ] Les tests manuels passent
- [ ] Le code est commenté
- [ ] Le README est mis à jour si nécessaire
- [ ] Le CHANGELOG est mis à jour
- [ ] Aucun fichier inutile n'est inclus

## 🎨 Zones de Contribution

### 🟢 Facile (Débutants)

- Améliorer la documentation
- Corriger des typos
- Ajouter des commentaires
- Améliorer les messages de console
- Traduire en d'autres langues

### 🟡 Moyen (Intermédiaire)

- Ajouter de nouvelles protections simples
- Améliorer l'UI du popup
- Optimiser les performances
- Ajouter des tests automatisés
- Améliorer le système de statistiques

### 🔴 Difficile (Avancé)

- Implémenter de nouvelles techniques anti-fingerprinting
- Créer un système de whitelist
- Ajouter un mode furtif avancé
- Développer un dashboard web
- Implémenter du Machine Learning

## 🌟 Idées de Fonctionnalités

### Haute Priorité
- [ ] Système de whitelist/blacklist personnalisable
- [ ] Export des logs en JSON/CSV
- [ ] Mode développeur avec debug avancé
- [ ] Profils de protection (Faible/Moyen/Maximum)
- [ ] Notifications desktop pour les menaces

### Moyenne Priorité
- [ ] Dashboard web avec graphiques
- [ ] Support multi-langue (i18n)
- [ ] Synchronisation entre appareils
- [ ] Historique des menaces bloquées
- [ ] Rapports hebdomadaires

### Basse Priorité
- [ ] Thèmes pour le popup (dark/light)
- [ ] Raccourcis clavier
- [ ] Intégration avec VPN
- [ ] Mode gaming (désactiver temporairement)
- [ ] API pour développeurs

## 📚 Ressources

### Documentation Technique
- [Chrome Extensions Manifest V3](https://developer.chrome.com/docs/extensions/mv3/)
- [WebRTC API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [Canvas Fingerprinting](https://browserleaks.com/canvas)

### Outils Utiles
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Extension Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/)
- [JSON Validator](https://jsonlint.com/)

## 💬 Communication

### Discord/Discussions
- Poser des questions
- Discuter de nouvelles fonctionnalités
- Partager des idées
- Obtenir de l'aide

### Issues GitHub
- Bugs uniquement
- Fonctionnalités avec spec claire
- Problèmes reproductibles

## 🎖️ Contributeurs

Merci à tous ceux qui contribuent ! Votre nom apparaîtra ici.

<!-- Contributors list will be automatically generated -->

## 📄 Licence

En contribuant, vous acceptez que vos contributions soient sous licence MIT, comme le reste du projet.

---

**Merci de contribuer à rendre Internet plus sûr ! 🛡️**
