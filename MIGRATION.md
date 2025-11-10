# Migration Google Sheets → Firestore

## ⚠️ Important

Ce document explique comment migrer **une seule fois** toutes les données de Google Sheets vers Firestore.

**Prérequis :**
- Node.js installé
- Accès au projet Firebase
- Variables d'environnement configurées dans `.env.local`

---

## Étapes de Migration

### 1. Vérifier les variables d'environnement

Assurez-vous que `.env.local` contient :

```bash
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=AIzaSy...
REACT_APP_FIREBASE_AUTH_DOMAIN=ih-app-b8d8a.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=ih-app-b8d8a
REACT_APP_FIREBASE_STORAGE_BUCKET=ih-app-b8d8a.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=807620143387
REACT_APP_FIREBASE_APP_ID=1:807620143387:web:...
REACT_APP_FIREBASE_MEASUREMENT_ID=G-DR7FPKF7J8
```

### 2. Installer les dépendances Firebase (si pas déjà fait)

```bash
npm install firebase
```

### 3. Exécuter le script de migration

```bash
node src/scripts/migrateGSheetsToFirestore.js
```

Le script va :
1. ✅ Lire toutes les données depuis Google Sheets
2. ✅ Créer les comptes Firebase Auth pour tous les utilisateurs
3. ✅ Transférer les données vers Firestore :
   - Utilisateurs (users)
   - Matchs (matchs)
   - Convocations (convocations)
   - Notes (notes)
   - Statistiques (stats)
   - Évaluations (evaluations)

### 4. Déployer les Security Rules

#### Option A : Via Firebase Console

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez le projet `ih-app-b8d8a`
3. Menu **Firestore Database** → Onglet **Règles**
4. Copiez-collez le contenu de `firestore.rules`
5. Cliquez sur **Publier**

#### Option B : Via Firebase CLI

```bash
# Installer Firebase CLI (si pas déjà fait)
npm install -g firebase-tools

# Se connecter
firebase login

# Déployer les règles
firebase deploy --only firestore:rules
```

### 5. Tester l'application

```bash
# Démarrer l'app
npm start

# Tester les fonctionnalités :
# ✅ Login avec un compte existant
# ✅ Affichage des matchs
# ✅ Convocations
# ✅ Notes et statistiques (vue coach)
# ✅ Évaluations (vue joueur)
```

### 6. Vérifier dans Firebase Console

1. Allez sur Firebase Console → Firestore Database
2. Vérifiez que toutes les collections contiennent des données :
   - `users` : 27 documents (26 joueurs + 1 coach)
   - `matchs` : ~18 documents
   - `convocations` : données variables
   - `notes` : données variables
   - `stats` : données variables
   - `evaluations` : données variables

---

## Troubleshooting

### Erreur : `auth/email-already-in-use`

**Cause** : Un utilisateur avec cet email existe déjà dans Firebase Auth.

**Solution** : C'est normal si vous ré-exécutez le script. Le script skip automatiquement les utilisateurs existants.

### Erreur : `Permission denied`

**Cause** : Les Security Rules bloquent l'écriture.

**Solution** : Temporairement, activez les règles de test dans Firebase Console :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // TEMPORAIRE - Ne pas utiliser en production !
    }
  }
}
```

Après la migration, remettez les vraies règles de `firestore.rules`.

### Erreur : `fetch is not defined` (Node.js < 18)

**Cause** : Node.js version < 18 n'a pas `fetch` natif.

**Solution** : Installer `node-fetch` :

```bash
npm install node-fetch@2
```

Puis modifier le script :

```javascript
// En haut du fichier migrateGSheetsToFirestore.js
const fetch = require('node-fetch');
```

### Google Sheets retourne des données vides

**Cause** : URL du script Google Sheets incorrecte ou permissions manquantes.

**Solution** :
1. Vérifier que `REACT_APP_SCRIPT_URL` dans `.env.local` est correct
2. Tester l'URL manuellement dans le navigateur : `https://script.google.com/.../exec?onglet=Joueurs`
3. S'assurer que le script Google Apps est déployé et public

---

## Post-Migration

### 1. Mettre à jour Vercel

Ajoutez les variables d'environnement dans Vercel Dashboard :

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet ESC Cappelle
3. Settings → Environment Variables
4. Ajoutez toutes les variables `REACT_APP_FIREBASE_*`
5. Redéployez l'application

### 2. Supprimer le code Google Sheets (optionnel)

Une fois la migration validée et testée en production :

```bash
# Supprimer les fichiers Google Sheets
rm src/services/googleSheetsService.js
rm src/hooks/useGoogleSheets.js

# Supprimer les anciens scripts de migration
rm src/scripts/migrateToFirestore.js  # Ancien script
```

### 3. Nettoyer les .env

Supprimer les anciennes variables Google Sheets :

```bash
# À supprimer de .env.local et .env.production
REACT_APP_SCRIPT_URL=...  # Plus besoin
```

---

## Rollback (si nécessaire)

Si vous voulez revenir à Google Sheets :

1. Dans `src/App.js`, remplacer :
   ```javascript
   import { useFirestore } from './hooks/useFirestore';
   ```
   par :
   ```javascript
   import useGoogleSheets from './hooks/useGoogleSheets';
   ```

2. Restaurer l'appel du hook :
   ```javascript
   const { ... } = useGoogleSheets(user);
   ```

3. Redéployer

---

## Support

En cas de problème lors de la migration, vérifiez :

1. ✅ Les variables d'environnement Firebase sont correctes
2. ✅ Firebase Auth est activé (Email/Password)
3. ✅ Firestore Database est créé (mode production)
4. ✅ Le script Google Sheets est accessible
5. ✅ Node.js version ≥ 16

Pour toute question, consultez la [documentation Firebase](https://firebase.google.com/docs/firestore).
