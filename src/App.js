import React, {useEffect} from 'react';
import './App.css';
import Login from './components/Login/Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './components/Player/Player';
import { useDataLayerValue } from './DataLayer';


const spotify = new SpotifyWebApi();


function App() {

  const [{token}, dispatch] = useDataLayerValue();

  const discoverWeeklyKey = process.env.REACT_APP_DISCOVER_WEEKLY_KEY;

  useEffect(() => {

    const hash = getTokenFromUrl();
    window.location.hash="";
    const _token = hash.access_token;

    if(_token) {

      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });

      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        //console.log('👨', user);
        dispatch({
          type: 'SET_USER',
          user: user, //or just user for ES6 shorthand
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists,
        });
      });

      spotify.getPlaylist('37i9dQZEVXcKgxIq0z1Fur').then((response) => {
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response,
        });
      });

      spotify.getMyTopArtists().then((response) => {
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        });
      });

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });
    }

  }, [token, dispatch]);
  

  return (

    <div className="App">

      {
        token ? (
          <Player spotify={spotify} />
        ) : (
          <Login/>
        )
      }

       

    </div>

  );

};

export default App;
