import React, { useState, useEffect } from 'react';
import AudioPlayer from '../../components/audioPlayer/audioPlayer';
import './trending.css';
const PopularTracks = () => {
  const clientId = 'e5785a9a';
  const limit = 10;

  const [tracks, setTracks] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPopularTracks = async () => {
    setLoading(true);
    const url = `https://api.jamendo.com/v3.0/tracks?client_id=${clientId}&format=json&limit=${limit}&offset=${offset}&order=popularity_total`;
    const response = await fetch(url);
    const data = await response.json();
    setTracks( prevTracks =>{
      const alltracks =  [...prevTracks, ...data.results];
      const uniqueTracks = Array.from(
        new Map(alltracks.map(track => [track.id, track])).values()
      );
      return uniqueTracks;
    });
    setLoading(false);
  };
  useEffect(() => {
    fetchPopularTracks();
  }, [offset]);

  const loadMore = () => {
    setOffset(prev => prev + limit);
  };

  const [openCardId, setOpenCardId] = useState(null);

  const handleClick = (id) => {
    setOpenCardId(prev => (prev === id ? null : id)); // toggle card
  };

  return (
    <div className="screen-container">
      <h2> Trending Songs🔥</h2>
      <div>
        <ul className='tracks'>
          {tracks.map(track=>(
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
      <div>

      </div>
      <button onClick={loadMore} disabled={loading} className="btn">
        {loading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
};

export default PopularTracks


