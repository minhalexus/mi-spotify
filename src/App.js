import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login.js';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player.js';
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  // const [token, setToken] = useState(null);
  const [appState, dispatch] = useDataLayerValue();
  
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    const _token = hash.access_token;

    if(_token){
      dispatch({
        type: "SET_TOKEN",
        token: _token
      });

      spotify.setAccessToken(_token);

      spotify.getMe()
      .then(user => {
        dispatch({
          type: 'SET_USER',
          user: user
        })
      });

      spotify.getUserPlaylists()
      .then((playlists) => {
        console.log("My playlists", playlists)
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists
        })
      });

      ///////////////////// GET TRACKS
      spotify.getPlaylist('6Hgl8CpwtjMzhcal4GyJCa')
      .then(response => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response
        })
      })
    }
  }, []);

  return (
    <div className="app">
      {
        appState.token ? (
          <Player spotify={spotify} />
        ) : (
          <Login />
        )
      }
    </div>
  );
}

export default App;
