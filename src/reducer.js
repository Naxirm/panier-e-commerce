import CartItem from "./CartItem";

const reducer = (state, action) => {
  if (action.type === "CLEAR_LIST") {
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const newList = state.cart.filter((item) => item.id !== action.payload);
    return {
      ...state,
      cart: newList,
    };
  }

  if (action.type === "INCREASE_ITEM") {
    let tempCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 };
      }

      return item;
    });

    return { ...state, cart: tempCart };
  }

  if (action.type === "DECREASE_ITEM") {
    let tempCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 };
        }

        return item;
      })
      .filter((item) => item.amount !== 0);

    return { ...state, cart: tempCart };
  }

  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (totals, item) => {
        totals.amount += item.amount;
        totals.total += item.amount * item.price;
        return totals;
      },
      { total: 0, amount: 0 }
    );

    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }

  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, loading: false, cart: action.payload };
  }

  return state;
};

export default reducer;
