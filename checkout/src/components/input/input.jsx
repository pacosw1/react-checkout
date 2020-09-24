import React from "react";

import "./input.scss";

export const Input = ({ label }) => {
  return (
    <div className="input-cont">
      <input type="text" className="input-field" placeholder={label} />
      <label className="input-label">{label}</label>
    </div>
  );
};
