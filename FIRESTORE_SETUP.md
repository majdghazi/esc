# Configuration Firestore

## Déploiement des Security Rules

### Option 1 : Via Firebase Console (Recommandé pour débuter)

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez le projet `ih-app-b8d8a`
3. Dans le menu latéral, cliquez sur **Firestore Database**
4. Allez dans l'onglet **Règles** (Rules)
5. Copiez-collez le contenu du fichier `firestore.rules`
6. Cliquez sur **Publier** (Publish)

### Option 2 : Via Firebase CLI

```bash
# Installer Firebase CLI si pas déjà fait
npm install -g firebase-tools

# Se connecter à Firebase
firebase login

# Initialiser le projet (si pas déjà fait)
firebase init firestore

# Déployer les règles
firebase deploy --only firestore:rules
```

## Structure des Collections Firestore

### `users` (Utilisateurs)
```javascript
{
  id: string,           // ID utilisateur (identique à l'ID du document)
  nom: string,          // Nom complet du joueur/coach
  username: string,     // Username unique
  role: string,         // 'coach' | 'coach_adjoint' | 'joueur'
  email: string,        // Email généré (username@esccappelle.com)
  createdAt: timestamp  // Date de création
}
```

### `matchs` (Matchs)
```javascript
{
  id: string,              // ID unique du match
  date: string,            // Format DD/MM/YYYY
  adversaire: string,      // Nom de l'équipe adverse
  domicile: string,        // 'true' | 'false'
  statut: string,          // 'avenir' | 'joue'
  scoreEquipe: number,     // Score de l'équipe (null si pas joué)
  scoreAdversaire: number, // Score adverse (null si pas joué)
  updatedAt: string        // ISO timestamp
}
```

### `convocations` (Convocations)
```javascript
{
  id_match: string,      // ID du match
  id_joueur: string,     // ID du joueur
  convoque: boolean,     // true si convoqué
  statut: string,        // 'en_attente' | 'accepte' | 'refuse'
  updatedAt: string      // ISO timestamp
}
```

### `notes` (Notes de performance)
```javascript
{
  id_match: string,      // ID du match
  id_joueur: string,     // ID du joueur
  note: number,          // Note de 1 à 9
  updatedAt: string      // ISO timestamp
}
```

### `stats` (Statistiques de match)
```javascript
{
  id_match: string,      // ID du match
  id_joueur: string,     // ID du joueur
  buts: number,          // Nombre de buts marqués (0-15)
  temps: number,         // Temps de jeu en minutes (0-120)
  passes: number,        // Nombre de passes décisives (0-15)
  updatedAt: string      // ISO timestamp
}
```

### `evaluations` (Évaluations des coachs par les joueurs)
```javascript
{
  id_joueur: string,     // ID du joueur qui évalue
  evaluateur: string,    // 'isma' | 'adam'
  technicite: number,    // Note de 1 à 10
  vision: number,        // Note de 1 à 10
  collectif: number,     // Note de 1 à 10
  mental: number,        // Note de 1 à 10
  updatedAt: string      // ISO timestamp
}
```

## Permissions par Rôle

### Coach
- ✅ Lecture : tous les utilisateurs, matchs, convocations, notes, stats, évaluations
- ✅ Écriture : matchs, convocations, notes, stats
- ❌ Écriture : évaluations (lecture seule)

### Coach Adjoint
- ✅ Lecture : tous les utilisateurs, matchs, convocations, notes, stats, évaluations
- ❌ Écriture : aucune modification (lecture seule)

### Joueur
- ✅ Lecture : son propre profil, matchs, convocations, notes, stats, évaluations
- ✅ Écriture : ses propres évaluations de coachs, accepter/refuser convocations
- ❌ Écriture : matchs, notes, stats des autres

## Quotas Firestore (Free Tier)

- **Lectures** : 50 000 / jour (gratuit)
- **Écritures** : 20 000 / jour (gratuit)
- **Suppressions** : 20 000 / jour (gratuit)
- **Stockage** : 1 Go (gratuit)

**Estimation pour ESC Cappelle** :
- ~30 utilisateurs
- ~20 matchs par saison
- Écritures : ~100-200 / jour max (largement dans les quotas)
- Lectures : ~500-1000 / jour max (largement dans les quotas)

✅ **L'app reste dans le tier gratuit !**

## Migration Google Sheets → Firestore

Pour migrer les données existantes de Google Sheets vers Firestore, utiliser le script :

```bash
node src/scripts/migrateToFirestore.js
```

⚠️ **Attention** : Ce script doit être exécuté une seule fois lors de la migration initiale.

## Rollback (si besoin)

Si vous voulez revenir à Google Sheets :

1. Dans `src/App.js`, remplacer :
   ```javascript
   import { useFirestore } from './hooks/useFirestore';
   ```
   par :
   ```javascript
   import { useGoogleSheets } from './hooks/useGoogleSheets';
   ```

2. Redéployer l'application

## Monitoring

Pour surveiller l'utilisation Firestore :

1. Firebase Console → Firestore Database
2. Onglet **Utilisation** (Usage)
3. Vérifier les quotas en temps réel
