## Documentation Technique pour le Système de Gestion des Stocks et Transactions

### Description Générale

Ce système permet la gestion des stocks et des transactions dans une base de données. Il offre les fonctionnalités suivantes :

- Affichage des stocks et produits disponibles.
- Gestion des transactions, incluant l'ajout et le retrait de produits dans les stocks.
- Affichage des produits disponibles dans un stock spécifique.

### Configuration de l'Environnement

#### Dépendances

- Python 3.x
- Bibliothèque `psycopg2` pour Python
- PostgreSQL

#### Installation de la Bibliothèque

```bash
pip install psycopg2
```

#### Configuration de la Base de Données

- Assurez-vous que PostgreSQL est installé et en cours d'exécution.
- Créez une base de données nommée `bdd_tp_note`.
- Exécutez les scripts SQL pour créer les tables nécessaires (`stocks`, `products`, `stock_products`, `transactions`).

### Structure du Programme

Le programme est structuré comme suit :

#### Classe `Database`

Cette classe gère la connexion à la base de données et l'exécution des requêtes.

- `initialise`: Initialise la connexion à la base de données.
- `get_connection`: Récupère une connexion à la base de données.
- `return_connection`: Retourne la connexion au pool.
- `close_all_connections`: Ferme toutes les connexions.
- `execute_query`: Exécute une requête SQL.

#### Fonctions de Gestion des Stocks et Transactions

- `add_stock`: Ajoute du stock pour un produit donné.
- `remove_stock`: Retire du stock pour un produit donné.
- `create_transaction`: Crée une transaction (INCOMING/OUTGOING) pour un produit dans un stock.

#### Fonctions d'Assistance et de Commandes

- `validate_input`: Valide et convertit les entrées utilisateur.
- `transaction_command`: Traite la commande de transaction.
- `display_stock_products_command`: Affiche les produits d'un stock spécifique.

#### Fonction `main`

Lance l'application et gère la boucle principale de l'interface utilisateur en ligne de commande.

### Utilisation

1. Exécutez le script pour démarrer le programme.
2. Utilisez les commandes suivantes pour interagir avec le système :
   - `h` : Affiche l'aide.
   - `s` : Affiche la liste des stocks.
   - `p` : Affiche la liste des produits.
   - `sp` : Affiche les produits d'un stock spécifié.
   - `t` : Effectue une transaction.
   - `q` : Quitte le programme.

### Gestion des Erreurs

Le système gère les erreurs telles que les problèmes de connexion à la base de données, les erreurs d'exécution des requêtes SQL, et les entrées utilisateur invalides. Les erreurs sont affichées à l'utilisateur avec des messages appropriés.

### Sécurité et Fiabilité

- La validation des entrées utilisateur prévient les erreurs de type et les injections SQL.
- La gestion des transactions assure l'intégrité des données lors des opérations de stock.
