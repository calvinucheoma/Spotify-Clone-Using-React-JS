import { Favorite, MoreHoriz, PlayCircleFilled } from '@mui/icons-material';
import React from 'react';
import { useDataLayerValue } from '../../DataLayer';
import Header from '../Header/Header';
import SongRow from '../SongRow/SongRow';
import './Body.css';


const Body = ({spotify}) => {

  const [{discover_weekly}, dispatch] = useDataLayerValue();

    const playPlaylist = (id) => {
        spotify
          .play({
            context_uri: `spotify:playlist:37i9dQZEVXcKgxIq0z1Fur`,
          })
          .then((res) => {
            spotify.getMyCurrentPlayingTrack().then((response) => {
              dispatch({
                type: "SET_ITEM",
                item: response.item,
              });
              dispatch({
                type: "SET_PLAYING",
                playing: true,
              });
            });
          });
      };

      const playSong = (id) => {
        spotify
          .play({
            uris: [`spotify:track:${id}`],
          })
          .then((res) => {
            spotify.getMyCurrentPlayingTrack().then((response) => {
              dispatch({
                type: "SET_ITEM",
                item: response.item,
              });
              dispatch({
                type: "SET_PLAYING",
                playing: true,
              });
            });
          });
      };

  return (

    <div className='body'>

        <Header spotify={spotify} />

        <div className="bodyInfo">

          <img src={discover_weekly?.images[0].url} alt="Discover Weekly Image" />
          
          <div className="bodyInfoText">
            <strong> PLAYLIST </strong>
            <h2> Discover Weekly </h2>
            <p> {discover_weekly?.description} </p>
          </div>

        </div>

          <div className="bodySongs">

             <div className="bodyIcons">
                <PlayCircleFilled className='bodyShuffle' onClick={playPlaylist} />
                <Favorite fontSize='large' />
                <MoreHoriz />
             </div>

              {discover_weekly?.tracks.items.map((item) => {
                return (
                  <SongRow track={item.track} playSong={playSong}  />
                )
              })}
              
          </div>

        </div>

    

  )

};

export default Body;