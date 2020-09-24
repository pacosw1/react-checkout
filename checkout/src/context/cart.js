import React, { createContext } from "react";
import * as firebase from "firebase";
const initialState = {
  products: [],
  subtotal: 0,
  shipping: 0,
  total: 0,
};
const auth = createContext(initialState);

const authReducer = (state, action) => {
  // let stateCopy = { ...state };
  switch (action.type) {
    case "SET_ADDRESS":
      return { currentUser: action.currentUser, uid: action.uid };
    default:
      return state;
  }
};

export { auth, authReducer };
