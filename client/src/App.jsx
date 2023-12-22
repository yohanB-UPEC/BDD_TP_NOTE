import { hot } from 'react-hot-loader';
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './App.css';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

const useJoueurs = () => {
  const [etat, setEtat] = useState({
    error: false,
    loading: true,
    data: null
  })
  useEffect(() => {
    fetch("http://localhost:3000/joueurs", {method: "get"}).then((res) => res.json()).then((resp) => {
      console.log(resp)
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

function App () {
  const joueurs = useJoueurs();
  const [search, setSearch] = useState({
    value: null,
    input: ''
  })

  if(joueurs.loading) {
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
            <Autocomplete
              value={search.value}
              onChange={(event, newValue) => {
                setSearch({
                  ...search,
                  value: newValue,
                });
              }}
              inputValue={search.input}
              onInputChange={(event, newInput) => {
                setSearch({
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
              renderInput={(params) => <TextField {...params} label="Controllable" />}
              />
          </Toolbar>
        </AppBar>
    </Box>
  )
}

export default hot(module)(App);
