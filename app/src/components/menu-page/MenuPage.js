import React from 'react';
import './menuPage.css';
import { useState, useEffect } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import pizza from '../../assets/menu-buttons/pizza.png';
import burger from '../../assets/menu-buttons/burger.png';
import shake from '../../assets/menu-buttons/shake.png';
import all from '../../assets/menu-buttons/all.png';



const MenuPage = () => {

  const buttons = [
    {
      id: 0,
      title: 'pizza',
      image: pizza,

    },
    {
      id: 1,
      title: 'burgers',
      image: burger,

    },
    {
      id: 2,
      title: 'shakes',
      image: shake,

    },
    {
      id: 3,
      title: 'all',
      image: all,
    
    },
  ]

  return (
    <div className='right-side menu-page'>
        <div className='header'>

            <h1 className='fs-1'>Menu</h1>

            <div className="input-container">
                
                <SearchOutlinedIcon />

                <input type="text"/>

            </div>
        </div>

        <div className="filter-buttons">
          {buttons.map((button) => (
            <button key={button.id} className={`filter-button fs-4 button-${button.title}`}>
              {button.title}
              <img className={`image ${button.title}-image`} src={button.image} alt={button.image} width='50px' />
            </button>
          ))}
        </div>

        <div className='product-grid'>

        </div>
    </div>
  )
}

export default MenuPage