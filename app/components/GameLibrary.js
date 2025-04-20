// File: app/components/GameLibrary.js
// Description: This component is a placeholder for the game library page.
import React from 'react'

  const GameLibrary = ({ games }) => {
    // Skeleton for Steam API game library
    const fetchGameLibrary = async () => {
      try {
        const response = await fetch('https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=YOUR_API_KEY&steamid=YOUR_STEAM_ID&format=json');
        const data = await response.json();
        return data.response.games;
      } catch (error) {
        console.error('Error fetching game library:', error);
        return [];
      }
    };

    // Fallback games while loading
    const gameList = games || [
      { name: 'Elden Ring', img: 'https://via.placeholder.com/100x50' },
      { name: 'Cyberpunk', img: 'https://via.placeholder.com/100x50' },
      { name: 'No Man’s Sky', img: 'https://via.placeholder.com/100x50' }
    ];

    return (
      <div className=" border-primary border-t-4  rounded-lg p-4 bg-background-light">
        <div className="grid grid-cols-1 gap-4">
          {gameList.map((game, index) => (
            <div key={index} className="flex items-center">
              <img
                src={game.img}
                alt={game.name}
                className="w-24 h-12 rounded-lg mr-4"
              />
              <span className="text-white">{game.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default GameLibrary

