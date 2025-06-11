import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './playlistsPage.css';


export default function PlayListsPage() {
    const clientId="e5785a9a";
    const [playlists, setPlaylists]=useState([]);
    const limit=10;

    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchPlaylists = async ()=>{
        setLoading(true);
        const url=`https://api.jamendo.com/v3.0/playlists/?client_id=${clientId}&format=json&limit=${limit}&offset=${offset}`;
        const response= await fetch(url);
        const data=await response.json();
        setPlaylists( prev =>{
            const all=[...prev, ...data.results];
            const unique = Array.from(
                new Map(all.map(playlist => [playlist.id, playlist])).values()
            )
            return unique;
        });
        setLoading(false);
    }
    useEffect(() => {
        fetchPlaylists();
    }, [offset]);

    const loadMore = () => {
        setOffset(prev => prev + limit);
    };
    return (
        <div className='screen-container'>
            <h2>Jamendo Playlists</h2>
            <div className='playlists'>
                {playlists.map(playlist => (
                    <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
                        <div className='playlist-card'>
                            <h4>{playlist.name}<span className='artistName'> | created by {playlist.user_name}</span></h4>
                            <h5 className='artistName'>{playlist.creationdate}</h5>
                        </div>
                    </Link>
                ))}
            </div>
            <button onClick={loadMore} disabled={loading} className="btn">
                {loading ? 'Loading...' : 'Load More'}
            </button>
        </div>
    )
}
