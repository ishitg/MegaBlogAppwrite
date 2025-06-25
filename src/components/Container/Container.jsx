import React from "react";

// what is a container in react?
// A container is a component that wraps other components to provide a consistent layout or styling.
function Container({ children }) {
  return <div className="w-full max-w-7xl mx-auto px-4">{children}</div>;
}

export default Container;
