import { createContext, useContext, useState } from "react";

const SelectedRestaurantContext = createContext();

export const useSelectedRestaurant = () => useContext(SelectedRestaurantContext);

export const SelectedRestaurantProvider = ({ children }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <SelectedRestaurantContext.Provider value={{ selectedRestaurant, setSelectedRestaurant }}>
      {children}
    </SelectedRestaurantContext.Provider>
  );
};
