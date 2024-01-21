import React, { useState, useEffect } from 'react';
import '../styles/menu.css'
import Spinner from '../images/Spinner.gif'

const Menu = () => {

    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from the API
        fetch(process.env.REACT_APP_MENU_API_URL)
            .then((response) => response.json())
            .then((data) => {
                setMenuItems(data)
                setLoading(false)
            })
            .catch((error) => console.error('Error fetching menu:', error));
    }, []);

    // Organize and sort menu items by category
    const organizedMenu = {};
    menuItems.forEach((item) => {
        const category = item.category.name;
        if (!organizedMenu[category]) {
            organizedMenu[category] = [];
        }
        organizedMenu[category].push(item);
    });

    // Sort items in each category alphabetically
    Object.keys(organizedMenu).forEach((category) => {
        organizedMenu[category].sort((a, b) => a.name.localeCompare(b.name));
    });

    return (
        <div className='menu'>
            <h1>Menu</h1>
            {loading ? <div className='loadingSpinnerContainer'>
            <svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" class="spinner_aj0A"/></svg>
            </div> : 
            Object.keys(organizedMenu).map((category) => (
                <div key={category}>
                    <h2>{category}</h2>
                    <ul className='menuList'>
                        {organizedMenu[category].map((item) => (
                            <li className='menuListItem' key={item.uuid}>
                                <div className='menuImageContainer'>
                                    <img src={item.presentation.imageUrl} alt={item.name} />
                                </div>
                                <h3>{item.name}</h3>
                                <p>{item.variants[0].price.amount / 100} kr</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Menu;
