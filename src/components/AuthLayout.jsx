import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      // Agar user logged-in hai aur logout karta hai → Usko /login page pe bhejo.
      // Agar user logged-in nahi hai aur login karta hai → Usko / (home/dashboard) pe bhejo.

      // If authentication is true (the user is supposed to be logged in)
      //  but authStatus does not match (indicating a logout event),
      // it navigates the user to the /login page.
      // you were trying to access a protected route while not being authenticated

      // ye page dkehne k liye tum logged in hone chiye mtlb authentication is true
      // to ham check krte h tum kahi logged out to nahi ho
      // if there's a mismatch between the expected authentication state and the actual authStatus,
      // it navigates the user to the login page (/login).

      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }

    //  ye page dkehne k liye tum logged out hone chiye mtlb authentication is false
    // to ham check krte h tum kahi logged in to nahi ho
    // if there is a mismatch between the expected authentication state and the actual authStatus,
    // it navigates the user to the home page (/).

    // If authentication is false (the user is not supposed to be logged in)
    //  but authStatus does not match
    // (indicating a login event), it navigates the user to the home page (/).

    setLoader(false);
  }, [authStatus, authentication, navigate]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
