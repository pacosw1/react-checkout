import React from "react";
import "./App.css";
import { Input } from "./components/input/input";
import { Checkout } from "./pages/Checkout";
import { Button } from "./components/button/button";

function App() {
  return (
    <div className="App">
      <Checkout />
    </div>
  );
}

export default App;
