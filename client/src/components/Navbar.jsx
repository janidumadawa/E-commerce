// client/src/components/Navbar.jsx
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const {
    user,
    setUser,
    setShowUserLogins,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success("Logged out successfully");
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      {/* Logo Section */}
      <NavLink
        to="/"
        onClick={() => setOpen(false)}
        className="flex items-center gap-3 group"
      >
        <div className="flex items-center gap-2">
          <img
            className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
            src="/Slogo.png"
            alt="Saman Store Logo"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-800 leading-tight">
              Saman
            </span>
            <span className="text-xs text-yellow-600 font-medium uppercase tracking-wide">
              Stores
            </span>
          </div>
        </div>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.836 10.615 15 14.695"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              clipRule="evenodd"
              d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src="../src/assets/cart_icon.svg"
            alt="Cart"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-yellow-500 w-[18px] h-[18px] rounded-full">
            {getCartCount()}{" "}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogins(true)}
            className="cursor-pointer px-8 py-2 bg-yellow-500 hover:bg-yellow-600 transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src="../src/assets/profile_icon.png" className="w-10" alt="" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow-border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              <li
                onClick={() => navigate("my-orders")}
                className="p-1 pl-3 hover:bg-yellow-400 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="p-1 pl-3 hover:bg-yellow-400 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex item-center gap-6 sm:hidden">
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src="../src/assets/cart_icon.svg"
            alt="Cart"
            className="w-6 opacity-80"
          />

          <button className="absolute -top-2 -right-3 text-xs text-white bg-yellow-500 w-[18px] h-[18px] rounded-full">
            {getCartCount()}{" "}
          </button>
        </div>
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className=""
        >
          <img src="../src/assets/menu_icon.svg" alt="Menu" />
        </button>
      </div>

      {open && (
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
        >
          <NavLink
            to="/"
            className="w-full text-left py-2 hover:bg-gray-100 transition"
            onClick={() => setOpen(false)}
          >
            {" "}
            Home{" "}
          </NavLink>
          <NavLink
            to="/products"
            className="w-full text-left py-2 hover:bg-gray-100 transition"
            onClick={() => setOpen(false)}
          >
            All Products{" "}
          </NavLink>
          {user && (
            <NavLink
              to="/products"
              onClick={() => setOpen(false)}
              className="w-full text-left py-2 hover:bg-gray-100 transition"
            >
              {" "}
              My Orders{" "}
            </NavLink>
          )}
          <NavLink
            to="/about"
            className="w-full text-left py-2 hover:bg-gray-100 transition"
            onClick={() => setOpen(false)}
          >
            About Us{" "}
          </NavLink>
          <NavLink
            to="/contact"
            className="w-full text-left py-2 hover:bg-gray-100 transition"
            onClick={() => setOpen(false)}
          >
            Contact Us{" "}
          </NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogins(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-yellow-500 hover:bg-yellow-600 transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-yellow-500 hover:bg-yellow-600 transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
