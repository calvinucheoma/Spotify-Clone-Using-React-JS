import React from 'react';
import SidebarOption from '../SidebarOption/SidebarOption';
import './Sidebar.css';
import { Home, Search, LibraryMusic } from '@mui/icons-material';
import { useDataLayerValue } from '../../DataLayer';


const Sidebar = () => {

  const [{playlists}, dispatch] = useDataLayerValue();

  return (

    <div className='sidebar'>

        <img className='sidebarLogo' src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="spotify logo" />
        <SidebarOption title='Home' Icon={Home} />
        <SidebarOption title='Search' Icon={Search}/>
        <SidebarOption title='Your Library' Icon={LibraryMusic} />
        
        <br/>
        <strong className="sidebarTitle"> PLAYLISTS </strong>
        <hr/>

        {playlists?.items?.map((playlist) => {
          return (
            <SidebarOption title={playlist.name} />
          )
        })}
    
    </div>
    

  )

};

export default Sidebar;