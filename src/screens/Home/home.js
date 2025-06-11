import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Search from '../Search/search'
import Trending from '../Trending/trending'
import Sidebar from "../../components/Sidebar/sidebar"
import PlayListsPage from '../Playlists/playlistsPage'
import PlaylistTracks from '../Playlists/playslistTracks'
// import AudioPlayer from '../../components/audioPlayer/audioPlayer';

import './home.css'

export default function Home() {
    return(
    <Router>
        <div className="main-body">
            <Sidebar />
            <Routes>
                <Route path ="/" element={<Search />} />
                <Route path="/playlists" element={<PlayListsPage />} />
                <Route path="/playlist/:playlistId" element={<PlaylistTracks />} />
                <Route path ="/trending" element={<Trending />} />
            </Routes>
        </div>
    </Router>
    );
}
