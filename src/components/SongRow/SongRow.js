import React from 'react';
import './SongRow.css';


const SongRow = ({track, playSong}) => {

  return (

    <div className='songRow' onClick={() => playSong(track.id)}>

        <img className='songRowAlbum' src={track.album.images[0].url} alt="album images" />

        <div className="songRowInfo">
            <h1>{track.name}</h1>
            <p>
                {track.artists.map((artist) => artist.name).join(", ")} -{" "}
                {track.album.name}
            </p>
        </div>

    </div>

  )

};

export default SongRow;