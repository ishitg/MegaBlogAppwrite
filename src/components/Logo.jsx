import React from "react";

function Logo(props) {
  return (
    <img
      src="https://readymadeui.com/readymadeui.svg"
      alt="logo"
      className={`w-36 ${props.className || ""} `}
    />
  );
}

export default Logo;
