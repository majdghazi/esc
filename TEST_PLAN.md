# Plan de Test - ESC Cappelle

**Date**: 2025-11-06
**Version**: Phase 2 (Migration Firestore)
**Testeur**: Claude (Product Owner + Developer)
**Environnement**: Local (http://localhost:3000)

## État Actuel

### ✅ Complété
1. **Sécurité**
   - Firebase config déplacé vers `.env.local`
   - Passwords retirés de `demoData.js`
   - `.gitignore` mis à jour

2. **Migration Firestore**
   - Hook `useFirestore.js` complété avec CRUD + auto-save
   - Hook `useFirebaseAuth.js` migré vers Firebase pur
   - `App.js` utilise maintenant `useFirestore` au lieu de `useGoogleSheets`
   - Security Rules créées dans `firestore.rules` (NON déployées)

3. **Scripts**
   - `src/scripts/createTestUser.js` - Créer utilisateur de test
   - `src/scripts/createTestData.js` - Créer données de test (BLOQUÉ par security rules)
   - `src/scripts/migrateGSheetsToFirestore.js` - Migration complète (BLOQUÉ par Google Sheets API)

4. **Environnement**
   - Application lancée sur localhost:3000 ✅
   - Compilation réussie avec warnings mineurs ✅
   - Utilisateur de test créé: `coach / test123` ✅

### ❌ Problèmes Identifiés

1. **Google Sheets API**
   - Retourne `{"error":"Onglet introuvable"}`
   - Migration automatique impossible pour le moment
   - Solution temporaire: Tests avec Firestore vide + création manuelle via l'app

2. **Firestore Security Rules**
   - NON déployées → Utilise les règles par défaut de Firebase
   - Par défaut, Firebase refuse tout en mode production
   - BLOQUER l'écriture depuis scripts Node.js
   - Écriture via l'app devrait fonctionner (authentifié)

3. **Warnings ESLint**
   - `CoachView.jsx:12` - `getStatutConvocation` non utilisé
   - `MatchDetail.jsx:3` - `getNoteEquipe` non utilisé
   - `migrateToFirestore.js` - Imports non utilisés
   - **Impact**: Aucun (warnings seulement)

---

## Tests à Effectuer

### 🔐 Test 1: Authentification Firebase

**Objectif**: Vérifier que le login Firebase fonctionne

**Étapes**:
1. Ouvrir http://localhost:3000
2. Vérifier affichage du formulaire de login
3. Entrer identifiants: `coach` / `test123`
4. Cliquer "Se connecter"

**Résultat Attendu**:
- ✅ Connexion réussie
- ✅ Redirection vers interface Coach
- ✅ Nom affiché: "Coach Test"
- ✅ Aucune erreur dans console

**Résultat Attendu en cas d'ÉCHEC**:
- ❌ Message d'erreur clair dans l'interface
- ❌ Console log indique le problème exact
- ❌ Pas de crash de l'application

---

### 📊 Test 2: Affichage avec Firestore Vide

**Objectif**: Vérifier que l'app gère gracieusement l'absence de données

**Étapes**:
1. Après login réussi
2. Observer l'interface Coach

**Résultat Attendu**:
- ✅ Interface charge sans erreur
- ✅ Affiche "Aucun match" ou liste vide
- ✅ Boutons d'action visibles (Ajouter match, etc.)
- ✅ Pas d'erreur "undefined" dans console

**Problèmes Potentiels**:
- ❌ Erreur "Cannot read property 'length' of undefined"
- ❌ Crash si le code suppose que `matchs` contient toujours des données
- ❌ Boucle `.map()` sur undefined

---

### ➕ Test 3: Création de Match (CRUD - Create)

**Objectif**: Tester l'écriture dans Firestore

**Prérequis**: Test 1 et 2 réussis, connecté en tant que coach

**Étapes**:
1. Cliquer sur "Ajouter un match"
2. Remplir formulaire:
   - Date: 2024-02-10
   - Adversaire: FC Test Local
   - Domicile: Oui
3. Cliquer "Enregistrer"

**Résultat Attendu**:
- ✅ Match créé et affiché dans la liste
- ✅ Notification de succès
- ✅ Données persistées dans Firestore
- ✅ Auto-save fonctionne

**Résultat Attendu en cas d'ÉCHEC**:
- ❌ Erreur "Permission denied" → Security Rules bloquent
- ❌ Erreur réseau → Problème Firebase config
- ❌ Match créé mais non sauvegardé → Problème auto-save

---

### ✏️ Test 4: Modification de Match (CRUD - Update)

**Prérequis**: Test 3 réussi, au moins 1 match existant

**Étapes**:
1. Cliquer sur un match
2. Modifier l'adversaire
3. Observer le comportement

**Résultat Attendu**:
- ✅ Auto-save déclenché après modification
- ✅ Données mises à jour dans Firestore
- ✅ Aucune erreur console

---

### 🗑️ Test 5: Suppression de Match (CRUD - Delete)

**Prérequis**: Au moins 1 match existant

**Étapes**:
1. Cliquer sur un match
2. Cliquer "Supprimer"
3. Confirmer suppression

**Résultat Attendu**:
- ✅ Match supprimé de la liste
- ✅ Supprimé de Firestore
- ✅ Notification de succès

---

### 👥 Test 6: Convocations

**Prérequis**: Au moins 1 match créé

**Étapes**:
1. Ouvrir détails d'un match
2. Essayer d'ajouter des convocations

**Problème Identifié**:
- ⚠️ Il n'y a actuellement AUCUN joueur dans Firestore
- Le coach ne peut pas convoquer des joueurs inexistants

**Résultat Attendu**:
- ✅ Message "Aucun joueur disponible"
- OU
- ❌ Crash si le code suppose que `joueurs` n'est jamais vide

**Solution Temporaire**:
- Créer manuellement des joueurs via Firebase Console
- OU
- Accepter cette limitation pour les tests initiaux

---

### 📝 Test 7: Notes & Statistiques

**Prérequis**: Match + joueurs existants

**Étapes**:
1. Marquer un match comme "terminé"
2. Essayer d'ajouter notes et stats

**Résultat Attendu**:
- ✅ Notes sauvegardées dans Firestore
- ✅ Stats (buts, temps de jeu, passes) sauvegardées
- ✅ Auto-save fonctionne

---

### 🔓 Test 8: Déconnexion

**Étapes**:
1. Cliquer "Déconnexion"

**Résultat Attendu**:
- ✅ Retour à l'écran de login
- ✅ Session Firebase fermée
- ✅ Données effacées du state

---

### 🎮 Test 9: Vue Joueur

**Prérequis**: Créer un utilisateur joueur dans Firebase

**Étapes**:
1. Créer utilisateur: `joueur1 / test123`
2. Se connecter en tant que joueur
3. Observer l'interface

**Résultat Attendu**:
- ✅ Affichage vue joueur (pas coach)
- ✅ Matchs affichés
- ✅ Convocations visibles
- ✅ Pas d'accès aux fonctions CRUD

---

## Bugs Critiques à Surveiller

### 🔴 Priorité Critique

1. **Permission Denied lors de l'écriture Firestore**
   - Symptôme: Erreur console "PERMISSION_DENIED"
   - Cause: Security Rules non déployées ou trop restrictives
   - Fix: Déployer rules en mode test OU ajuster `firestore.rules`

2. **Firebase Config non chargée**
   - Symptôme: Erreur "Firebase App not initialized"
   - Cause: `.env.local` non lu ou variables mal nommées
   - Fix: Vérifier `REACT_APP_` prefix

3. **useFirestore en boucle infinie**
   - Symptôme: Console flooded de "Loading data..."
   - Cause: `hasInitialized.current` ne fonctionne pas
   - Fix: Ajouter logs pour débugger le useEffect

### 🟡 Priorité Moyenne

4. **Gestion d'état vide**
   - Symptôme: Crash au chargement si Firestore vide
   - Cause: `.map()` sur undefined ou null
   - Fix: Ajouter vérifications `|| []`

5. **Auto-save trop fréquent**
   - Symptôme: Trop d'écritures Firestore
   - Cause: useEffect déclenché à chaque render
   - Fix: Debounce ou vérifier dépendances

### 🟢 Priorité Basse

6. **Warnings ESLint**
   - Imports non utilisés
   - Fonctions non utilisées
   - Fix: Nettoyer le code

---

## Checklist de Validation Finale

Avant de demander au client de tester:

- [ ] Login fonctionne
- [ ] Interface charge sans crash
- [ ] Firestore vide géré correctement
- [ ] Création de match fonctionne
- [ ] Auto-save fonctionne
- [ ] Modification de match fonctionne
- [ ] Suppression de match fonctionne
- [ ] Déconnexion fonctionne
- [ ] Aucune erreur critique dans console
- [ ] Performance acceptable (pas de lags)

---

## Notes pour le Client

**Compte de test créé:**
- Username: `coach`
- Password: `test123`

**Limitations actuelles:**
1. Firestore est vide → Vous devrez créer les matchs manuellement via l'interface
2. Pas de joueurs → Impossible de tester les convocations/notes pour le moment
3. Google Sheets migration échouée → À investiguer avec le vrai spreadsheet

**Prochaines étapes après validation:**
1. Déployer Security Rules sur Firebase
2. Créer utilisateurs joueurs
3. Migrer données depuis Google Sheets (avec vraie URL)
4. Commit Git
5. Déploiement Vercel
