import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import hamburger from "../hamburger.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/UserAction";
const links = [
  { id: 2, text: "Create Blog", to: "/blog/create" },
  { id: 3, text: "your blogs", to: "/your-blogs" },
  { id: 4, text: "all blogs", to: "/all-blogs" },
  { id: 5, text: "Logout" },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logoutSuccess } = useSelector((state) => state.user);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const onMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  const onCloseButtonClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (logoutSuccess) {
      navigate("/login");
    }
  }, [logoutSuccess]);
  return (
    <>
      <header className="relative shadow-lg px-3 py-2">
        <nav className="flex justify-between">
          <div
            className={`navLinks z-10 duration-500 absolute md:static md:w-auto w-3/4 md:h-auto h-screen bg-white flex md:items-center gap-[1.5vw] ${
              isMenuOpen ? "left-[0%]" : "left-[-100%]"
            } px-5 md:py-0 py-5`}
          >
            <button
              onClick={onCloseButtonClick}
              className="absolute top-3 right-3 text-gray-600 md:hidden"
            >
              Close
            </button>

            <ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8">
              {links.map((link) => (
                <li
                  key={link.id}
                  className="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.text === "Logout" ? (
                    <Link onClick={handleLogout}>{link.text}</Link>
                  ) : (
                    <Link to={link.to}>{link.text}</Link>
                  )}
                </li>
              ))}
              <SearchBar />
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <img
              src={hamburger}
              alt="menu icon"
              name={isMenuOpen ? "close" : "menu"}
              onClick={onMenuToggle}
              className="text-[30px] cursor-pointer md:hidden"
            />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
