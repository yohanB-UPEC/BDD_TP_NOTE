## Auteurs :
- Tom Dejardin
- Yohan Bordes
- Florian Queudot

# Rapport d'Audit et de Sécurité pour le Système de Gestion des Stocks et Transactions

## Analyse de l'Audit

### Importance de l'Audit dans les Systèmes de Gestion de Stock

L'audit dans les systèmes de gestion de stock joue un rôle crucial en fournissant une traçabilité complète des transactions et des modifications de données. Cela est essentiel pour :

- **Traçabilité et Transparence** : Suivre toutes les modifications apportées aux données de stock pour détecter les erreurs, les fraudes, ou les malversations.
- **Conformité Réglementaire** : S'assurer que le système respecte les normes et réglementations en vigueur, en matière de gestion financière et opérationnelle.
- **Analyse des Tendances** : Permettre une analyse détaillée des données historiques pour identifier les tendances, améliorer la gestion des stocks, et optimiser les opérations.

### Utilisation de pgAudit

`pgAudit` est une extension de PostgreSQL qui fournit des capacités d'audit détaillées. Elle permet :

- **Audit de Sélection, Insertion, Mise à jour, et Suppression** : Enregistrer toute activité de modification de données, offrant une vue complète de l'activité sur les données.
- **Journalisation Détaillée** : Fournir des informations détaillées sur l'utilisateur, la commande exécutée, et le moment de l'exécution.
- **Personnalisation de l'Audit** : Configurer les niveaux d'audit pour différents objets de la base de données selon les besoins spécifiques de l'entreprise.

## Sécurité des Données

### Meilleures Pratiques de Sécurité pour PostgreSQL

#### Contrôle d'Accès

- **Authentification Forte** : Utiliser des méthodes d'authentification robustes comme MD5 ou SCRAM-SHA-256.
- **Principe du Moindre Privilège** : Attribuer aux utilisateurs uniquement les droits nécessaires à leurs tâches.
- **Gestion des Rôles et Permissions** : Utiliser des rôles pour gérer efficacement les permissions.

#### Sécurité au Niveau de la Base de Données

- **Chiffrement des Données** : Utiliser le chiffrement au repos (TDE) pour protéger les données stockées et SSL/TLS pour le chiffrement en transit.
- **Sauvegardes Sécurisées** : Effectuer des sauvegardes régulières et les stocker de manière sécurisée.

#### Surveillance et Maintenance

- **Mises à Jour et Patchs de Sécurité** : Appliquer régulièrement les mises à jour de PostgreSQL pour protéger contre les vulnérabilités connues.
- **Surveillance des Activités de la Base de Données** : Utiliser des outils comme pgAudit pour surveiller et enregistrer les activités de la base de données.

#### Sécurité au Niveau de l'Application

- **Injection SQL** : Utiliser des requêtes paramétrées pour éviter les injections SQL.
- **Validation des Entrées Utilisateur** : Valider systématiquement les entrées pour empêcher l'injection de données malveillantes.

### Impact de la Concurrence sur la Sécurité et l'Intégrité des Données

La concurrence, dans le contexte des systèmes de bases de données, fait référence à la gestion de l'accès simultané de multiples utilisateurs ou processus aux mêmes données. L'impact de la concurrence est particulièrement pertinent dans un système de gestion de stock, où les transactions fréquentes et simultanées sont courantes. Gérer correctement la concurrence est essentiel pour maintenir à la fois la sécurité et l'intégrité des données.

- **Intégrité des Données** : Sans une gestion adéquate de la concurrence, des problèmes tels que les mises à jour perdues, les lectures sales, et les incohérences transitoires peuvent survenir. Par exemple, si deux utilisateurs tentent de mettre à jour la même donnée en même temps, l'un des changements pourrait être écrasé sans que l'utilisateur en soit averti, conduisant à des données incorrectes ou obsolètes. PostgreSQL utilise des mécanismes comme le verrouillage des lignes et les versions multiversion (MVCC) pour assurer que chaque transaction opère avec une vue cohérente des données, tout en évitant les conflits.

- **Sécurité des Données** : Dans un environnement hautement concurrentiel, le risque d'exposition des données sensibles augmente. Il est crucial de s'assurer que les mécanismes de contrôle d'accès sont robustes et que les utilisateurs ne peuvent accéder qu'aux données qu'ils sont autorisés à voir. De plus, une surveillance accrue est nécessaire pour détecter et réagir rapidement à toute activité suspecte ou non autorisée, qui pourrait être masquée par le volume élevé de transactions légitimes.

- **Performance et Disponibilité** : Une gestion inefficace de la concurrence peut entraîner des goulots d'étranglement, affectant la performance et la disponibilité du système. Cela pourrait potentiellement conduire à des situations où les utilisateurs ne sont pas en mesure d'accéder ou de mettre à jour les données de manière opportune, compromettant ainsi l'efficacité opérationnelle.

En conclusion, la gestion de la concurrence est un aspect critique qui a un impact direct sur l'intégrité et la sécurité des données dans un système de gestion de stock. Des stratégies appropriées et des technologies telles que celles fournies par PostgreSQL doivent être mises en place pour assurer que les données restent cohérentes, sécurisées et accessibles, même dans un environnement hautement concurrentiel.