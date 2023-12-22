const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5000", "http://localhost:3000", "http://127.0.0.1:5000", "http://127.0.0.1:5000/"],
    credentials: true,
}));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'projet',
    password: 'test',
    port: 5432,
});


// (async () => {
//   const app = await express()

//   // pour servir les fichiers static du dossier /public
//   app.use(express.static(__dirname + 'public'));

//   // endpoint
//   app.get('/', function(req, res) {
//       res.send('Hello world !');
//   });

//   app.listen(3000, () => {
//       console.log("Example are listening on port 3000 !");
//   })
// })()



///////////////////////
/////// JOUEURS ///////
///////////////////////
app.get('/joueurs', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM joueurs');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/joueurs/:joueur_id', async (req, res) => {
    const { joueur_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM joueurs WHERE joueur_id = $1', [joueur_id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Joueur non trouvé');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/joueurs', async (req, res) => {
    const { pseudo, region, niveau } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO joueurs (pseudo, region, niveau) VALUES ($1, $2, $3) RETURNING *',
            [pseudo, region, niveau]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.delete('/joueurs/:joueur_id', async (req, res) => {
    const { joueur_id } = req.params;

    try {
        const deleteResult = await pool.query('DELETE FROM joueurs WHERE joueur_id = $1 RETURNING *', [joueur_id]);

        if (deleteResult.rowCount === 0) {
            return res.status(404).send('Joueur non trouvé');
        }

        res.status(200).json({ message: `Joueur avec l'ID ${joueur_id} supprimé avec succès.` });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur du serveur');
    }
});


///////////////////////
////// CHAMPIONS //////
///////////////////////
app.get('/champions', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM champions');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur du serveur');
    }
});

app.get('/champions/:champion_id', async (req, res) => {
    const { champion_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM champions WHERE champion_id = $1', [champion_id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Champion non trouvé');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur du serveur');
    }
});

app.post('/champions', async (req, res) => {
    const { nom, role, date_ajout } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO champions (nom, role, date_ajout) VALUES ($1, $2, $3) RETURNING *',
            [nom, role, date_ajout]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur du serveur');
    }
});

app.put('/champions/:champion_id', async (req, res) => {
    const { champion_id } = req.params;
    const { nom, role, date_ajout } = req.body;
    try {
        const result = await pool.query(
            'UPDATE champions SET nom = $1, role = $2, date_ajout = $3 WHERE champion_id = $4 RETURNING *',
            [nom, role, date_ajout, champion_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Champion non trouvé');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur du serveur');
    }
});

app.delete('/champions/:champion_id', async (req, res) => {
    const { champion_id } = req.params;
    try {
        const deleteResult = await pool.query('DELETE FROM champions WHERE champion_id = $1 RETURNING *', [champion_id]);
        if (deleteResult.rowCount === 0) {
            return res.status(404).send('Champion non trouvé');
        }
        res.status(200).json({ message: `Champion avec l'ID ${champion_id} supprimé avec succès.` });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur du serveur');
    }
});



///////////////////////
/////// MATCHS ////////
///////////////////////
app.get('/matchs', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM matchs');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur du serveur');
    }
});

app.get('/matchs/:match_id', async (req, res) => {
    const { match_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM matchs WHERE match_id = $1', [match_id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Match non trouvé');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur du serveur');
    }
});

app.post('/matchs', async (req, res) => {
    const { joueur_id, champion_id, champion_banni_id, resultat, mode_jeu, kills, deaths, assists, or_gagne, degats_infliges, date_heure, duree_partie } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO matchs (joueur_id, champion_id, champion_banni_id, resultat, mode_jeu, kills, deaths, assists, or_gagne, degats_infliges, date_heure, duree_partie) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
            [joueur_id, champion_id, champion_banni_id, resultat, mode_jeu, kills, deaths, assists, or_gagne, degats_infliges, date_heure, duree_partie]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur du serveur');
    }
});


///////////////////////
//// STAT CHAMPION ////
///////////////////////
app.get('/statistiques_champions/:champion_id', async (req, res) => {
    const { champion_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM statistiques_champions WHERE champion_id = $1', [champion_id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Statistiques pour le champion spécifié non trouvées');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur du serveur');
    }
});



///////////////////////
//////// OBJET ////////
///////////////////////
app.get('/objets', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM objets');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur du serveur');
    }
});




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});