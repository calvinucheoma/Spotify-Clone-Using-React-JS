import { Search } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React from 'react';
import { useDataLayerValue } from '../../DataLayer';
import './Header.css';



const Header = ({spotify}) => {

  const [{user}] = useDataLayerValue();

  return (

    <div className='header'>

        <div className="headerLeft">
            <Search/>
            <input type="text" placeholder='Search for Artists, Songs or Podcasts' />
        </div>

        <div className="headerRight">
            <Avatar src={user?.images[0]?.url} alt={user?.display_name}/>
            <h4>{user?.display_name}</h4>
        </div>

    </div>

  )

};

export default Header;