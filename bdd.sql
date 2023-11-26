CREATE DATABASE projet;

DROP TABLE IF EXISTS joueurs CASCADE;
CREATE TABLE joueurs (
    joueur_id SERIAL PRIMARY KEY,
    pseudo VARCHAR(255) UNIQUE NOT NULL,
    region VARCHAR(50),
    rang VARCHAR(50),
    niveau INTEGER,
    date_inscription TIMESTAMP,
    derniere_connexion TIMESTAMP
);

DROP TABLE IF EXISTS champions CASCADE;
CREATE TABLE champions (
    champion_id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    role VARCHAR(50),
    date_ajout TIMESTAMP
);

DROP TABLE IF EXISTS matchs CASCADE;
CREATE TABLE matchs (
    match_id SERIAL PRIMARY KEY,
    joueur_id INTEGER REFERENCES joueurs(joueur_id),
    champion_id INTEGER REFERENCES champions(champion_id),
    champion_banni_id INTEGER REFERENCES champions(champion_id),
    resultat VARCHAR(50),
    mode_jeu VARCHAR(50),
    kills INTEGER,
    deaths INTEGER,
    assists INTEGER,
    or_gagne INTEGER,
    degats_infliges INTEGER,
    date_heure TIMESTAMP,
    duree_partie INTERVAL
);

DROP TABLE IF EXISTS statistiques_champions CASCADE;
CREATE TABLE statistiques_champions (
    stats_id SERIAL PRIMARY KEY,
    champion_id INTEGER REFERENCES champions(champion_id),
    taux_victoire FLOAT,
    taux_selection FLOAT,
    taux_bannissement FLOAT,
    mise_a_jour TIMESTAMP
);

DROP TABLE IF EXISTS objets CASCADE;
CREATE TABLE objets (
    objet_id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    categorie VARCHAR(100),
    cout INTEGER,
    description TEXT
);

DROP TABLE IF EXISTS builds_champions CASCADE;
CREATE TABLE builds_champions (
    build_id SERIAL PRIMARY KEY,
    champion_id INTEGER REFERENCES champions(champion_id),
    objet_principal_id INTEGER REFERENCES objets(objet_id),
    objet_secondaire_id INTEGER REFERENCES objets(objet_id),
    popularite FLOAT,
    taux_victoire_build FLOAT
);

DROP TABLE IF EXISTS interactions_joueurs CASCADE;
CREATE TABLE interactions_joueurs (
    interaction_id SERIAL PRIMARY KEY,
    joueur_source_id INTEGER REFERENCES joueurs(joueur_id),
    joueur_cible_id INTEGER REFERENCES joueurs(joueur_id),
    type_interaction VARCHAR(50),
    date_interaction TIMESTAMP
);

DROP TABLE IF EXISTS commentaires_joueurs CASCADE;
CREATE TABLE commentaires_joueurs (
    commentaire_id SERIAL PRIMARY KEY,
    joueur_id INTEGER REFERENCES joueurs(joueur_id),
    auteur_id INTEGER REFERENCES joueurs(joueur_id),
    commentaire TEXT,
    note INTEGER,
    date_commentaire TIMESTAMP
);