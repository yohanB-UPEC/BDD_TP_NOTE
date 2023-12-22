import { hot } from 'react-hot-loader';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Autocomplete, CircularProgress, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AppBar, Box, Toolbar, Typography } from '@mui/material';

const useJoueurs = () => {
  const [etat, setEtat] = useState({
    error: false,
    loading: true,
    data: null
  })
  useEffect(() => {
    fetch("http://localhost:3000/joueurs", {method: "get"}).then((res) => res.json()).then((resp) => {
      setEtat({
        error: false,
        loading: false,
        data: resp
      })
    }).catch((err) => {
      setEtat({
        error: err,
        loading: false,
        data: null
      })
    })
  },[])

  return etat
}

const useChampions = () => {
  const [etat, setEtat] = useState({
    error: false,
    loading: true,
    data: null
  })
  useEffect(() => {
    fetch("http://localhost:3000/champions", {method: "get"}).then((res) => res.json()).then((resp) => {
      setEtat({
        error: false,
        loading: false,
        data: resp
      })
    }).catch((err) => {
      setEtat({
        error: err,
        loading: false,
        data: null
      })
    })
  })

  return etat
}

function App () {
  const joueurs = useJoueurs();
  const champions = useChampions()
  const [search, setSearchPlayer] = useState({
    value: null,
    input: ''
  })
  const [searchChampion, setSearchChampion] = useState({
    value: null,
    input: ''
  })
  const [selectedType, setSelectedType] = useState(null);

  if(joueurs.loading || champions.loading) {
    return (
      <Box sx={{flexGrow: 1}}>
          <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{flexGrow: 1}}>
        <AppBar>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              OP.GG
            </Typography>
            <Autocomplete // Autocomplete pour la recherche de joueurs
              value={search.value}
              onChange={(event, newValue) => {
                setSearchPlayer({
                  ...search,
                  value: newValue,
                });
                setSearchChampion({
                  value: null,
                  input: ''
                });
                setSelectedType('player');
              }}
              inputValue={search.input}
              onInputChange={(event, newInput) => {
                setSearchPlayer({
                  ...search,
                  input: newInput
                })
              }}
              sx={{width: 300, marginLeft: 16}}
              options={joueurs.data.map((joueur) => {return {id: joueur.joueur_id, pseudo: joueur.pseudo}})}
              getOptionLabel={(option) => {
                if(option == null) {
                  return '';
                }
                return option.pseudo;
              }}
              isOptionEqualToValue={(option, value) => option.id == value.id}
              renderInput={(params) => <TextField {...params} label="Chercher un joueur" />}
              />
              <Autocomplete // Autocomplete pour la recherche de champions
                value={searchChampion.value}
                onChange={(event, newValue) => {
                  setSearchChampion({
                    ...searchChampion,
                    value: newValue,
                  });
                }}
                inputValue={searchChampion.input}
                onInputChange={(event, newInput) => {
                  setSearchChampion({
                    ...searchChampion,
                    input: newInput
                  })
                  setSearchPlayer({
                    value: null,
                    input: ''
                  });
                  setSelectedType('champion');
                }}
                sx={{width: 300, marginLeft: 16}}
                options={champions.data.map((champion) => {return {id: champion.champion_id, nom: champion.nom}})}
                getOptionLabel={(option) => {
                  if(option == null || !option.nom) {
                    return '';
                  }
                  return option.nom;
                }}
                isOptionEqualToValue={(option, value) => option.id == value.id}
                renderInput={(params) => <TextField {...params} label="Chercher un champion" />}
              />
          </Toolbar>
        </AppBar>
        <TableContainer component={Paper}>
          <Box mt={7}>
              {selectedType === 'player' && search.value && joueurs.data
                .filter(joueur => joueur.joueur_id === search.value.id)
                .map((joueur) => (
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Pseudo</TableCell>
                        <TableCell align="right">Région</TableCell>
                        <TableCell align="right">Rang</TableCell>
                        <TableCell align="right">Niveau</TableCell>
                        <TableCell align="right">Date d'inscription</TableCell>
                        <TableCell align="right">Dernière connexion</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {joueurs.data
                        .filter(joueur => search.value && joueur.joueur_id === search.value.id)
                        .map((joueur) => (
                          <TableRow key={joueur.joueur_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{joueur.joueur_id}</TableCell>
                            <TableCell align="right">{joueur.pseudo}</TableCell>
                            <TableCell align="right">{joueur.region}</TableCell>
                            <TableCell align="right">{joueur.rang}</TableCell>
                            <TableCell align="right">{joueur.niveau} Elo</TableCell>
                            <TableCell align="right">{new Date(joueur.date_inscription).toLocaleDateString()}</TableCell>
                            <TableCell align="right">{new Date(joueur.derniere_connexion).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                ))}
              {selectedType === 'champion' && searchChampion.value && champions.data
                .filter(champion => champion.champion_id === searchChampion.value.id)
                .map((champion) => (
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Nom</TableCell>
                        <TableCell align="right">Rôle</TableCell>
                        <TableCell align="right">Date de sortie</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {champions.data
                        .filter(champion => searchChampion.value && champion.champion_id === searchChampion.value.id)
                        .map((champion) => (
                          <TableRow key={champion.champion_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{champion.champion_id}</TableCell>
                            <TableCell align="right">{champion.nom}</TableCell>
                            <TableCell align="right">{champion.role}</TableCell>
                            <TableCell align="right">{new Date(champion.date_ajout).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                ))}
            </Box>
        </TableContainer>
    </Box>
  )
}

export default hot(module)(App);
