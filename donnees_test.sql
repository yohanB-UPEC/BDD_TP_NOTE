INSERT INTO joueurs (pseudo, region, rang, niveau, date_inscription, derniere_connexion)
VALUES
  ('Joueur1', 'Région1', 'Or', 30, '2023-01-01', '2023-02-01'),
  ('Joueur2', 'Région2', 'Argent', 25, '2023-02-01', '2023-03-01'),
  ('Joueur3', 'Région1', 'Bronze', 20, '2023-03-01', '2023-04-01');

INSERT INTO champions (nom, role, date_ajout)
VALUES
  ('Champion1', 'Tank', '2023-01-01'),
  ('Champion2', 'Assassin', '2023-02-01'),
  ('Champion3', 'Mage', '2023-03-01');

INSERT INTO matchs (joueur_id, champion_id, champion_banni_id, resultat, mode_jeu, kills, deaths, assists, or_gagne, degats_infliges, date_heure, duree_partie)
VALUES
  (1, 1, 2,'Victoire', 'Classé', 10, 2, 5, 15000, 20000, '2023-01-02 12:00:00', '1 hour'),
  (2, 2, 3,'Défaite', 'Normal', 8, 4, 3, 12000, 18000, '2023-02-03 14:30:00', '45 minutes'),
  (3, 3, 1,'Victoire', 'Classé', 12, 1, 7, 18000, 25000, '2023-03-05 16:45:00', '1,5 hours');

INSERT INTO statistiques_champions (champion_id, taux_victoire, taux_selection, taux_bannissement, mise_a_jour)
VALUES
  (1, 0.65, 0.15, 0.05, '2023-01-05'),
  (2, 0.45, 0.12, 0.08, '2023-02-10'),
  (3, 0.75, 0.20, 0.10, '2023-03-15');

INSERT INTO objets (nom, categorie, cout, description)
VALUES
  ('Objet1', 'Dégâts d`attaque', 3000, 'Description de l`objet1'),
  ('Objet2', 'Puissance des sorts', 2500, 'Description de l`objet2'),
  ('Objet3', 'Armure', 1500, 'Description de l`objet3');

INSERT INTO builds_champions (champion_id, objet_principal_id, objet_secondaire_id, popularite, taux_victoire_build)
VALUES
  (1, 1, 2, 0.4, 0.6),
  (2, 2, 3, 0.3, 0.5),
  (3, 3, 1, 0.5, 0.7);

INSERT INTO interactions_joueurs (joueur_source_id, joueur_cible_id, type_interaction, date_interaction)
VALUES
  (1, 2, 'Demande d`ami', '2023-01-10'),
  (2, 3, 'Blocage', '2023-02-15'),
  (3, 1, 'Message', '2023-03-20');

INSERT INTO commentaires_joueurs (joueur_id, auteur_id, commentaire, note, date_commentaire)
VALUES
  (1, 2, 'Excellent joueur !', 5, '2023-01-15'),
  (2, 3, 'Nécessite des améliorations.', 3, '2023-02-20'),
  (3, 1, 'Coéquipier très utile !', 4, '2023-03-25');
