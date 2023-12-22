CREATE TRIGGER update_taux_victoire
AFTER INSERT ON matches
FOR EACH ROW
BEGIN
  DECLARE total_matchs INT;
  DECLARE total_victoires INT;
  DECLARE nouveau_taux_victoire DECIMAL(5,2);

  SELECT COUNT(*) INTO total_matchs
  FROM matches
  WHERE joueur_id = NEW.joueur_id;

  SELECT COUNT(*) INTO total_victoires
  FROM matches
  WHERE joueur_id = NEW.joueur_id
  AND resultat = 'victoire';

  SET nouveau_taux_victoire = (total_victoires / total_matchs) * 100;

  UPDATE joueurs
  SET taux_victoire = nouveau_taux_victoire
  WHERE id = NEW.joueur_id;
END;
