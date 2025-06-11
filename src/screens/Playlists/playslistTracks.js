import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import AudioPlayer from '../../components/audioPlayer/audioPlayer';
import './playlistTracks.css'
export default function PlaylistTracks() {
    const clientId='e5785a9a';
    const { playlistId } = useParams();
    const [tracks, setTracks] = useState([]);

    useEffect(()=> {
        fetch(`https://api.jamendo.com/v3.0/playlists/tracks/?client_id=${clientId}&id=${playlistId}&format=json`)
        .then(response => response.json())
        .then( data => {
            if (data.results.length > 0) {
            setTracks(data.results[0].tracks);
            }
        })
    }, [playlistId]);

    const navigate = useNavigate();

    const [openCardId, setOpenCardId] = useState(null);
    
    const handleClick = (id) => {
        setOpenCardId(prev => (prev === id ? null : id)); // toggle card
    };
    
  return (
    <div className='screen-container'>
        <button onClick={()=> navigate(-1)} className='goBackBtn'>
            ← Go back
        </button>
        <h2>Playlist Tracks</h2>
        <ul className="">
            {tracks.map(track => (
            <div className='track'>
              <li key={track.id}>
                <div onClick={() =>handleClick(track.id)} className="track-list">
                  <img src={track.album_image} alt={track.name} className="listImage"/>
                  <div className="music-info">
                    <p className='trackTitle'>{track.name}</p>
                    <p className='artistName'>{track.artist_name}</p>
                  </div>
                  <p className="duration">{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</p>
                </div>
                
                
                {openCardId === track.id && ( 
                <div className="track-card">
                  <div className="albumImage">
                    <img src={track.album_image} alt={track.name} className="cover" />
                    <div className='albumImage-shadow'>
                      <img src={track.album_image} alt={track.name} className="albumImage-shadow"/>
                    </div>
                  </div>

                  <div className='info'>
                    <p><span className='trackTitle'>{track.name}</span></p>
                    <p><span className='artistName'>{track.artist_name}</span></p>
                  </div>
                  <AudioPlayer src={track.audio} />
                </div>)}
                
              </li>
            </div>
            ))}
        </ul>
    </div>
  )
}
