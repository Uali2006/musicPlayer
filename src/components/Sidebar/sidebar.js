import React from 'react';
import "./sidebar.css";
import SidebarButton from "./sidebarButton";
import { FaGripfire , FaSearch} from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";



export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <div>
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />}/>
        <SidebarButton title="Playlists" to="/playlists" icon={<IoLibrary />}/>
        <SidebarButton title="Search" to="/" icon={<FaSearch />}/>
      </div>
    </div>
  )
}
