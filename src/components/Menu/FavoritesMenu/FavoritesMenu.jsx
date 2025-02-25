import React, { useEffect, useRef } from 'react';
import useFavoriteStore from '../../GlobalStoreZustand/useFavoriteStore';

const FavoritesMenu = ({ onClose }) => {
  const menuRef = useRef(null);
  const removeFromFavorites = useFavoriteStore((state) => state.removeFromFavorites);
  const favorites = useFavoriteStore((state) => state.favorites);

  const handleRemoveFromFavorites = (productId) => {
    removeFromFavorites(productId);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const totalFavorites = favorites.length;

  return (
    <div ref={menuRef} className="favorites-menu bg-gray-200 right-4 top-full p-6 shadow-lg absolute z-50 max-h-[450px] overflow-y-auto">
      <h2 className="text-xl text-center font-semibold mb-4">Favorites</h2>
      <hr />
      {totalFavorites === 0 ? (
        <p className="text-center pt-6 text-gray-700">No favorites added</p>
      ) : (
        <div className="divide-y divide-gray-400">
          {favorites.map((favorite, index) => (
            <ul key={index} className="py-6 flex gap-8 justify-between items-center">
              <li>
                <img className="w-16 h-20" src={favorite.images} alt={favorite.name} />
              </li>
              <li>
                <div>
                  <h3 className="text-lg font-semibold">{favorite.name}</h3>
                  <h2 className="text-lg font-semibold">$ {favorite.price}</h2>
                  <div className="flex gap-4"></div>
                </div>
              </li>
              <li>
                <button onClick={() => handleRemoveFromFavorites(favorite.id)} className="font-semibold text-red-500 focus:outline-none">
                  Remove
                </button>
              </li>
            </ul>
          ))}
        </div>
      )}
      <div className="divide-y">
        {/* Muestra el total de favoritos */}
        {totalFavorites > 0 && (
          <p className="text-lg mt-2">Total Favorites: {totalFavorites}</p>
        )}
      </div>
      <button onClick={onClose} className="flex mt-6 mx-auto bg-[#F1E2DB] text-black px-4 py-2 rounded-md hover:bg-primary focus:outline-none">
        Close
      </button>
    </div>
  );
};

export default FavoritesMenu;





// import React from "react";
// import useFavoriteStore from "../../GlobalStoreZustand/useFavoriteStore"; // Importa el hook del estado de favoritos

// const FavoritesMenu = ({ onClose }) => {
//   const removeFromFavorites = useFavoriteStore(
//     (state) => state.removeFromFavorites
//   );
//   const favorites = useFavoriteStore((state) => state.favorites);

//   const handleRemoveFromFavorites = (productId) => {
//     removeFromFavorites(productId);
//   };

//   // Calcula el total de productos favoritos
//   const totalFavorites = favorites.length;

//   return (
//     <div className="favorites-menu bg-gray-200 right-4 top-full p-6 shadow-lg absolute z-50 max-h-[450px] overflow-y-auto">
//       <h2 className="text-xl text-center font-semibold mb-4">Favorites</h2>

//       <hr />
//       {totalFavorites === 0 ? (
//         <p className="text-center pt-6 text-gray-700">No favorites added</p>
//       ) : (
//         <div className="divide-y divide-gray-400">
//           {favorites.map((favorite, index) => (
//             <ul
//               key={index}
//               className="py-6 flex gap-8 justify-between items-center"
//             >
//               <li>
//                 <img
//                   className="w-16 h-20"
//                   src={favorite.images}
//                   alt={favorite.name}
//                 />
//               </li>
//               <li>
//                 <div>
//                   <h3 className="text-lg font-semibold">{favorite.name}</h3>
//                   <h2 className="text-lg font-semibold">$ {favorite.price}</h2>
//                   <div className="flex gap-4"></div>
//                 </div>
//               </li>
//               <li>
//                 <button
//                   onClick={() => handleRemoveFromFavorites(favorite.id)}
//                   className="font-semibold text-red-500 focus:outline-none"
//                 >
//                   Remove
//                 </button>
//               </li>
//             </ul>
//           ))}
//         </div>
//       )}
//       <div className="divide-y">
//         {/* Muestra el total de favoritos */}
//       {totalFavorites > 0 && (
//         <p className="text-lg mt-2">Total Favorites: {totalFavorites}</p>
//       )}
//       </div>
      
//       <button
//         onClick={onClose}
//         className="flex mt-6 mx-auto bg-[#F1E2DB] text-black px-4 py-2 rounded-md hover:bg-primary focus:outline-none"
//       >
//         Close
//       </button>
//     </div>
//   );
// };

// export default FavoritesMenu;
