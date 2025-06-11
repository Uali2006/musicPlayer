import React, { useState, useEffect } from 'react';
import AudioPlayer from '../../components/audioPlayer/audioPlayer';
import { FaSearch } from 'react-icons/fa';
import './search.css';

const JamendoSearch = () => {
  const [searchTerm, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const clientId = 'e5785a9a'; // 🔁 Replace this with your actual Jamendo client_id

  const searchTracks = async () => {
    const url = `https://api.jamendo.com/v3.0/tracks?client_id=${clientId}&format=json&limit=10&search=${encodeURIComponent(searchTerm)}`;
    const response = await fetch(url);
    const data = await response.json();
    setTracks(data.results);
  };
  const [openCardId, setOpenCardId] = useState(null);

  const handleClick = (id) => {
    setOpenCardId(prev => (prev === id ? null : id)); // toggle card
  };

  return (
    <div className="screen-container">
      <h2 className="title">Jamendo Music Search</h2>
      <div className="search-wrapper">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for music..."
          className="search-input"
        />
        <button
          onClick={searchTracks}
          className="search-button"
        >
          Search <FaSearch className="search-icon" />
        </button>
      </div>

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
  );
};

export default JamendoSearch;
