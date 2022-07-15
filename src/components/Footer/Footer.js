import React, {useEffect} from 'react';
import './Footer.css';
import {PlayCircleOutline, SkipPrevious, SkipNext, Shuffle, Repeat, VolumeDown, PauseCircleOutline, PlaylistPlay } from '@mui/icons-material';
import { Grid, Slider } from '@mui/material';
import { useDataLayerValue } from '../../DataLayer';



const Footer = ({spotify}) => {

  const [{ token, item, playing }, dispatch] = useDataLayerValue();

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((response) => {
      // console.log(response);

      dispatch({
        type: "SET_PLAYING",
        playing: response.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: response.item,
      });
    });
  }, [spotify, dispatch]);


  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
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
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
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
  };

  return (

    <div className='footer'>

        <div className="footerLeft">

            <img className='footerAlbumLogo' src={item?.album.images[0].url} alt={item?.name} />
        
            {item ? (
              <div className="footerSongInfo">
                <h4>{item.name}</h4>
                <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
              </div>
            ) : (
              <div className="footerSongInfo">
                <h4>No song is playing</h4>
                <p>...</p>
              </div>
            )}
            
          </div>

        <div className="footerCenter">

            <Shuffle className='footerGreen' />
            <SkipPrevious onClick={skipNext} className='footerIcon' />
             {playing ? (
                <PauseCircleOutline onClick={handlePlayPause} fontSize="large" className="footerIcon"/>
              ) : (
                <PlayCircleOutline onClick={handlePlayPause} fontSize='large' className='footerIcon' />
              )
            }
            
            <SkipNext onClick={skipPrevious} className='footerIcon' />
            <Repeat className='footerGreen' />

        </div>

        <div className="footerRight">

            <Grid container spacing={2}>
                <Grid item>
                    <PlaylistPlay/>
                </Grid>
                <Grid item>
                    <VolumeDown/>
                </Grid>
                <Grid item xs>
                    <Slider aria-labelledby="continuous-slider"/>
                </Grid>
            </Grid>

        </div>

    </div>

  )

};

export default Footer;