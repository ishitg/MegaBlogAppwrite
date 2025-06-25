import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   its a promise in appwrite
  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        // after the info has been deleted we'll also have to make changes to the state
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button
      className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
