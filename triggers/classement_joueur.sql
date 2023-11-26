CREATE OR REPLACE FUNCTION update_rang_joueur()
RETURNS TRIGGER AS $$
BEGIN
    CASE
        WHEN NEW.niveau BETWEEN 1 AND 100 THEN
            NEW.rang := 'Fer I';
        WHEN NEW.niveau BETWEEN 101 AND 200 THEN
            NEW.rang := 'Fer II';
        WHEN NEW.niveau BETWEEN 201 AND 300 THEN
            NEW.rang := 'Fer III';
        WHEN NEW.niveau BETWEEN 301 AND 400 THEN
            NEW.rang := 'Fer IV';
        WHEN NEW.niveau BETWEEN 401 AND 500 THEN
            NEW.rang := 'Bronze I';
        WHEN NEW.niveau BETWEEN 501 AND 600 THEN
            NEW.rang := 'Bronze II';
        WHEN NEW.niveau BETWEEN 601 AND 700 THEN
            NEW.rang := 'Bronze III';
        WHEN NEW.niveau BETWEEN 701 AND 800 THEN
            NEW.rang := 'Bronze IV';
        WHEN NEW.niveau BETWEEN 801 AND 900 THEN
            NEW.rang := 'Argent I';
        WHEN NEW.niveau BETWEEN 901 AND 1000 THEN
            NEW.rang := 'Argent II';
        WHEN NEW.niveau BETWEEN 1001 AND 1100 THEN
            NEW.rang := 'Argent III';
        WHEN NEW.niveau BETWEEN 1101 AND 1200 THEN
            NEW.rang := 'Argent IV';
        WHEN NEW.niveau BETWEEN 1201 AND 1300 THEN
            NEW.rang := 'Or I';
        WHEN NEW.niveau BETWEEN 1301 AND 1400 THEN
            NEW.rang := 'Or II';
        WHEN NEW.niveau BETWEEN 1401 AND 1500 THEN
            NEW.rang := 'Or III';
        WHEN NEW.niveau BETWEEN 1501 AND 1600 THEN
            NEW.rang := 'Or IV';
        WHEN NEW.niveau BETWEEN 1601 AND 1700 THEN
            NEW.rang := 'Platine I';
        WHEN NEW.niveau BETWEEN 1701 AND 1800 THEN
            NEW.rang := 'Platine II';
        WHEN NEW.niveau BETWEEN 1801 AND 1900THEN
            NEW.rang := 'Platine III';
        WHEN NEW.niveau BETWEEN 1901 AND 2000 THEN
            NEW.rang := 'Platine IV';
        WHEN NEW.niveau BETWEEN 2001 AND 2100 THEN
            NEW.rang := 'Emeraude I';
        WHEN NEW.niveau BETWEEN 2101 AND 2200 THEN
            NEW.rang := 'Emeraude II';
        WHEN NEW.niveau BETWEEN 2201 AND 2300 THEN
            NEW.rang := 'Emeraude III';
        WHEN NEW.niveau BETWEEN 2301 AND 2400 THEN
            NEW.rang := 'Emeraude IV';
        WHEN NEW.niveau BETWEEN 2401 AND 2500 THEN
            NEW.rang := 'Diamant I';
        WHEN NEW.niveau BETWEEN 2501 AND 2600 THEN
            NEW.rang := 'Diamant II';
        WHEN NEW.niveau BETWEEN 2601 AND 2700 THEN
            NEW.rang := 'Diamant III';
        WHEN NEW.niveau BETWEEN 2701 AND 2800 THEN
            NEW.rang := 'Diamant IV';
        WHEN NEW.niveau BETWEEN 2801 AND 2900 THEN
            NEW.rang := 'Maître';
        WHEN NEW.niveau BETWEEN 2901 AND 3000 THEN
            NEW.rang := 'Grand-Maître';
        WHEN NEW.niveau > 3000 THEN
            NEW.rang := 'Challenger';
    END CASE;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
