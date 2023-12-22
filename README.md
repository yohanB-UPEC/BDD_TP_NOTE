
# OP.GG version simplifié

## Description
Une application web simplifiée inspirée de op.gg. Elle permet de visualiser et d'interagir avec des données liées au jeu League Of Legends.

## Prérequis
Pour lancer l'application, assurez-vous d'avoir installé :
- PostgreSQL
- Node.js
- npm

## Installation

### Étape 1: Créer une base de données
Ouvrez votre terminal et exécutez les commandes suivantes :
```bash
psql -U postgres
CREATE DATABASE base_de_donnees;
```

### Étape 2: Exécuter les scripts SQL
Exécutez les scripts SQL pour structurer la base de données :
```bash
psql -U utilisateur -d base_de_donnees -a -f bdd/bdd.sql
psql -U utilisateur -d base_de_donnees -a -f bdd/triggers/classement_joueur.sql
psql -U utilisateur -d base_de_donnees -a -f bdd/triggers/statistiques_champion.sql
psql -U utilisateur -d base_de_donnees -a -f bdd/triggers/taux_victoire.sql
psql -U utilisateur -d base_de_donnees -a -f bdd/donnees_test.sql
```

### Étape 3: Configurer la connexion à la base de données
Dans le fichier `server/index.js`, ajoutez vos informations de connexion :
```javascript
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'projet',
    password: 'test',
    port: 5432,
});
```

### Étape 4: Installer et lancer le serveur et le client
#### Lancement du serveur :
```bash
cd server
npm install
npm start
```

#### Lancement du client :
```bash
cd client
npm install
npm start
```

## Utilisation
Après avoir lancé le serveur et le client, ouvrez votre navigateur et accédez à :
```
http://localhost:5000/
```
