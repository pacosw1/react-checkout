import React, { createContext } from "react";
import * as firebase from "firebase";
const initialState = {
  street1: null,
  street2: null,
  city: null,
  postal: null,
  col: null,
  state: null,
  country: null,
  completed: false,
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
