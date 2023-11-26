-- Créer la fonction pour mettre à jour les statistiques du champion
CREATE OR REPLACE FUNCTION update_statistiques_champion()
RETURNS TRIGGER AS $$
BEGIN
    -- Mettre à jour le taux de victoire du champion sélectionné
    UPDATE statistiques_champions
    SET taux_victoire = ROUND(taux_victoire + 0.01)  -- Ajouter 1% au taux de victoire
    WHERE champion_id = NEW.champion_id;

    -- Mettre à jour le taux de sélection du champion sélectionné
    UPDATE statistiques_champions
    SET taux_selection = ROUND(taux_selection + 0.005)  -- Ajouter 0.5% au taux de sélection
    WHERE champion_id = NEW.champion_id;

    -- Mettre à jour le taux de banissement du champion banni
    UPDATE statistiques_champions
    SET taux_bannissement = ROUND(taux_bannissement + 0.01)  -- Ajouter 1% au taux de banissement
    WHERE champion_id = NEW.champion_banni_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer le déclencheur qui appelle la fonction après chaque insertion dans la table "matchs"
CREATE TRIGGER update_statistics_trigger
AFTER INSERT ON matchs
FOR EACH ROW
EXECUTE FUNCTION update_statistiques_champion();
