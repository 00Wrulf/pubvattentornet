import React, { useState, useEffect } from 'react';

const Menu = () => {

    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch(process.env.REACT_APP_MENU_API_URL)
            .then((response) => response.json())
            .then((data) => setMenuItems(data))
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
        <div>
            <h1>Menu</h1>
            {Object.keys(organizedMenu).map((category) => (
                <div key={category}>
                    <h2>{category}</h2>
                    <ul>
                        {organizedMenu[category].map((item) => (
                            <li key={item.uuid}>
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>Price: {item.variants[0].price.amount / 100} SEK</p>
                                </div>
                                <div>
                                    <img src={item.presentation.imageUrl} alt={item.name} style={{ width: 'auto', height: '100px' }} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Menu;
