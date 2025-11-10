# 🔄 INSTRUCTIONS DE RESTAURATION FIREBASE

## ⏰ À FAIRE DANS 3 HEURES (après que le quota Firebase se soit réinitialisé)

### Étape 1 : Nettoyage complet de Firebase
```bash
node clean-firebase.js
```
Ce script va supprimer TOUTES les collections Firebase pour repartir sur des bases propres.

⚠️ **IMPORTANT** : Si vous avez l'erreur "Quota exceeded", attendez encore 30 minutes et réessayez.

---

### Étape 2 : Restauration de toutes les données
```bash
node restore-data.js
```
Ce script va restaurer :
- ✅ 18 matchs
- ✅ 110 notes
- ✅ 26 buteurs
- ✅ 110 temps de jeu
- ✅ 15 passes décisives
- ✅ 110 convocations

Le script prend environ **5-10 minutes** (il y a des délais pour ne pas saturer Firebase).

---

### Étape 3 : Réactiver l'auto-save

Ouvrez le fichier `src/hooks/useFirestore.js` et **décommentez** toutes les lignes d'auto-save :

**Cherchez les lignes 114-156** et remplacez :

```javascript
// Auto-save DÉSACTIVÉ TEMPORAIREMENT - RESTAURATION EN COURS
// Auto-save Notes
// useEffect(() => {
//   if (!isInitialLoad.current && user?.role === 'coach' && notes.length > 0) {
//     ecrireCollection('notes', notes);
//   }
// }, [notes, user]);
```

Par :

```javascript
// Auto-save Notes
useEffect(() => {
  if (!isInitialLoad.current && user?.role === 'coach' && notes.length > 0) {
    ecrireCollection('notes', notes);
  }
}, [notes, user]);
```

**Faites pareil pour :**
- Auto-save Buteurs (lignes ~121-125)
- Auto-save Temps de jeu (lignes ~128-132)
- Auto-save Passes D (lignes ~135-139)
- Auto-save Matchs (lignes ~142-149)
- Auto-save Evaluations (lignes ~152-156)

---

### Étape 4 : Vérification

1. Rechargez l'application dans le navigateur (F5)
2. Connectez-vous en tant que coach
3. Vérifiez que tous les matchs sont présents
4. Vérifiez que toutes les données sont là (notes, buts, etc.)

---

## ✅ C'EST TERMINÉ !

Votre application est maintenant restaurée avec toutes les données et l'auto-save réactivé.

---

## 🆘 En cas de problème

Si vous avez toujours des erreurs "Quota exceeded" :
1. Attendez encore 1 heure
2. Réessayez les scripts

Si les données ne s'affichent pas :
1. Ouvrez la console Firebase : https://console.firebase.google.com/project/ih-app-b8d8a/firestore
2. Vérifiez que les collections sont bien créées
3. Vérifiez qu'il y a bien des documents dans chaque collection
