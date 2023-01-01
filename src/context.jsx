import React, { useState, useContext, useReducer, useEffect } from "react";
import CartItem from "./CartItem";
import cartItems from "./data";
import reducer from "./reducer";

const url = "https://course-api.com/react-useReducer-cart-project";

const AppContext = React.createContext();

const defaultState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const clearList = () => {
    dispatch({ type: "CLEAR_LIST" });
  };

  const removeItem = () => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const increaseItem = (id) => {
    dispatch({ type: "INCREASE_ITEM", payload: id });
  };

  const decreaseItem = (id) => {
    dispatch({ type: "DECREASE_ITEM", payload: id });
  };

  useEffect(() => {
    dispatch({ type: "LOADING" });
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: "DISPLAY_ITEMS", payload: data }));
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        cartItems,
        clearList,
        removeItem,
        increaseItem,
        decreaseItem,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
