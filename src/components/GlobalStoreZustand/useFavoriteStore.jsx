import React, { createContext, useContext, useState } from 'react';

// Creamos un contexto para manejar el estado global de favoritos
const FavoriteStoreContext = createContext();

// Hook personalizado para acceder al estado global de favoritos y sus funciones
export const useFavoriteStore = () => {
  return useContext(FavoriteStoreContext);
};

// Componente proveedor que envuelve la aplicación y proporciona el contexto de favoritos
export const FavoriteStoreProvider = ({ children }) => {
  // Estado para almacenar la lista de favoritos
  const [favorites, setFavorites] = useState([]);

  // Función para agregar un producto a la lista de favoritos
  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => [...prevFavorites, product]);
  };

  // Función para eliminar un producto de la lista de favoritos
  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((product) => product.id !== productId)
    );
  };

  // Objeto que contiene el estado de favoritos y las funciones para manipularlo
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
  };

  // Envuelve la aplicación con el contexto de favoritos y sus funciones
  return (
    <FavoriteStoreContext.Provider value={value}>
      {children}
    </FavoriteStoreContext.Provider>
  );
};
