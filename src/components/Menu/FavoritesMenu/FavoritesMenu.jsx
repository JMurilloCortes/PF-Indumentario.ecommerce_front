import React from "react";

const FavoritesMenu = ({ favorites }) => {
  return (
    <div className="favorites-menu">
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index} className="favorite-item">
            <img src={favorite.image} alt={favorite.name} className="w-16 h-16 rounded-full" />
            <div className="favorite-details ml-4">
              <p className="font-bold">{favorite.name}</p>
              <p>${favorite.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesMenu;
