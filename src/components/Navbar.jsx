import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { logo } from "../assets";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import useData from "../hooks/useData";
import { signOut, getAuth } from "firebase/auth";

const Navbar = () => {
  const auth = getAuth()
  const { user, dispatch } = useData();
  {/* function of user sign out */}
  const signout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "ADD_USER", payload: null });
      })
      .catch((err) => console.log(err));
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Contact", path: "/contact" },
    { id: 3, name: "About", path: "/about" },
  ];
  return (
    <header className="my-4 w-[85%] mx-auto">
      <nav className="flex justify-between relative items-center">
        {/* Logo */}
        <div className="logo">
          <img src={logo} className="w-[100px]" alt="logo" />
        </div>

        {/* Desktop Links */}
        <div className="hidden lgl:flex gap-8 items-center">
          {navLinks.map(link => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "font-medium border-b-2 border-gray-300 cursor-pointer"
                  : "font-medium cursor-pointer"
              }
            >
              {link.name}
            </NavLink>
          ))}
          {user ? (
            <>
              <span className="ml-4">Hello, {user.userName}</span>
              <button
                className="ml-4 text-white bg-red-500 px-4 py-1 rounded"
                onClick={signout}
              >
                Sign Out
              </button>
            </>
          ) : (
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "font-medium border-b-2 border-gray-300 cursor-pointer ml-4"
                  : "font-medium cursor-pointer ml-4"
              }
            >
              Sign Up
            </NavLink>
          )}
        </div>

        {/* lists of faviorites and cart */}
        <div className="flex gap-3 ml-4">
          <Link to="/wishlist">
            <CiHeart className="text-2xl text-black" />
          </Link>
          <Link to="/cart">
            <IoCartOutline className="text-2xl text-black" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="lgl:hidden cursor-pointer z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoClose className="text-2xl text-black" /> : <FaBars className="text-2xl text-black" />}
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-[70%] bg-white shadow-lg transform transition-transform duration-300 ease-in-out lgl:hidden 
            ${menuOpen ? "translate-x-0  z-50" : "translate-x-full"}`}
        >
          <div className="flex flex-col gap-8 pt-28 items-center relative">
            {navLinks.map(link => (
              <NavLink
                key={link.id}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "font-medium border-b-2 border-gray-300 text-lg cursor-pointer"
                    : "font-medium text-lg cursor-pointer"
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Conditional Sign Up / User */}
            {user ? (
              <>
                <button
                  className="text-white bg-red-500 px-4 py-1 rounded"
                  onClick={signout}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <NavLink
                to="/signup"
                className="font-medium text-lg cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </NavLink>
            )}
          </div>
        </div>
        {       /* overlay */}
        {menuOpen && (
          <div
            className="fixed z-40 inset-0 lgl:hidden"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}
      </nav>
    </header>
  )
}

export default Navbar;
