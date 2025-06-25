import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor} `}
      type={type}
      {...props}
    >
      {children}
      {/* children is nothing but just some text that was passed */}
    </button>
  );
}
// Forwardref is when we've a login form and say we've an input field which will be used for username, password, etc.
// so now our login page is somewhere else and we want to use this input field in that login page.
// So we can use this input field in that login page and we can pass the ref to that input field.
// and as per referencers, we can use that ref to focus on that input field.

export default Button;
