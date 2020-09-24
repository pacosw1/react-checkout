import React from "react";

import "./button.scss";

export const Button = ({ onClick, text, width, height, bg, color, border }) => {
  return (
    <button
      onClick={onClick}
      style={{
        color: color,
        backgroundColor: bg,
        height: `${height}rem`,
        width: `${width}rem`,
        border: "1px solid " + border,
      }}
      className="btn"
    >
      {text}
    </button>
  );
};
