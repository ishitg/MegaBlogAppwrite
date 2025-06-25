import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// cuz we've to retrieve values from store to check is user is logged in or not
import { useNavigate } from "react-router-dom";

function handleClick() {
  var collapseMenu = document.getElementById("collapseMenu");
  if (collapseMenu.style.display === "block") {
    collapseMenu.style.display = "none";
  } else {
    collapseMenu.style.display = "block";
  }
}

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  // return (
  //   <header className="py-3 shadow bg-gray-500">
  //     <Container>
  //       <nav className="flex">
  //         <div className="flex mr-4">
  //           <Link to="/">
  //             <Logo width="70px" />
  //           </Link>
  //         </div>
  //         <ul className="flex ml-auto">
  //           {navItems.map((item) =>
  //             item.active ? (
  //               <li key={item.name}>
  //                 {/* this navigate is same as link*/}
  //                 <button
  //                   onClick={() => navigate(item.slug)}
  //                   className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
  //                 >
  //                   {item.name}
  //                 </button>
  //               </li>
  //             ) : null
  //           )}
  //           {authStatus && (
  //             <li>
  //               <LogoutBtn />
  //             </li>
  //           )}
  //         </ul>
  //       </nav>
  //     </Container>
  //   </header>
  // );

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-gray-950 min-h-[70px] tracking-wide relative z-50 text-white border-b-2 border-b-gray-700">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        <Link to="/" className="max-sm:hidden">
          <Logo />
        </Link>
        <Link to="/" className="hidden max-sm:block">
          <img
            src="https://readymadeui.com/readymadeui.svg"
            alt="logo"
            className="w-30"
          />
        </Link>

        <div
          id="collapseMenu"
          className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
        >
          <button
            id="toggleClose"
            onClick={() => handleClick()}
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-gray-950 w-9 h-9 flex items-center justify-center border border-gray-200 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 fill-white"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
          </button>

          <ul className="lg:flex gap-x-4 max-lg:space-y-3 max-lg:fixed max-lg:bg-gray-950 max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="mb-6 hidden max-lg:block">
              <a href="javascript:void(0)">
                <img
                  src="https://readymadeui.com/readymadeui.svg"
                  alt="logo"
                  className="w-36"
                />
              </a>
            </li>

            {navItems.map((item) =>
              item.active ? (
                <li
                  key={item.name}
                  className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3 "
                >
                  {/* this navigate is same as link*/}
                  <button
                    onClick={() => navigate(item.slug)}
                    className=" text-white block font-medium text-[15px] cursor-pointer hover:text-blue-600  max-lg:transition-all max-lg:duration-200 max-lg:ease-in-out hover:scale-105"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
          </ul>
        </div>

        <div className="flex max-lg:ml-auto space-x-4">
          {authStatus && (
            <li className="list-none">
              <LogoutBtn />
            </li>
          )}

          <button
            id="toggleOpen"
            className="lg:hidden cursor-pointer"
            onClick={() => handleClick()}
          >
            <svg
              className="w-7 h-7"
              fill="#fff"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
