const express = require('express');

(async () => {
    const app = await express()

    // pour servir les fichiers static du dossier /public
    app.use(express.static(__dirname + 'public'));

    // endpoint
    app.get('/', function(req, res) {
        res.send('Hello world !');
    });

    app.listen(3000, () => {
        console.log("Example are listening on port 3000 !");
    })
})()
