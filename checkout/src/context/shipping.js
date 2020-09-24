import React, { createContext } from "react";
import * as firebase from "firebase";
const initialState = {
  uid: null,
  name: null,
  description: null,
};
const auth = createContext(initialState);

const authReducer = (state, action) => {
  // let stateCopy = { ...state };
  switch (action.type) {
    case "SET_SHIPPING":
      return { currentUser: action.currentUser, uid: action.uid };
    default:
      return state;
  }
};

export { auth, authReducer };
