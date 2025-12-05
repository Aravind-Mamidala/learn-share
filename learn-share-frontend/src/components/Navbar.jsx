import { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "";

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`bg-white shadow-md fixed w-full top-0 left-0 z-50 ${
        isDarkMode ? "dark:bg-gray-800 dark:text-white" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-3 sm:px-4 py-3 sm:py-5">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400"
        >
          LearnShare
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-4 lg:gap-8 text-base lg:text-lg">
          <Link
            to="/explore"
            className="hover:text-green-500 dark:hover:text-green-400 transition-colors"
          >
            Explore
          </Link>
          <li>
            <input
              type="text"
              placeholder="Search teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              className={`border rounded-full px-3 lg:px-5 py-1.5 lg:py-2 outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base w-32 lg:w-auto ${
                isDarkMode
                  ? "dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  : ""
              }`}
            />
          </li>
          <li>
            <Link
              to="/teach"
              className="hover:text-green-500 dark:hover:text-green-400"
            >
              Teach With Us
            </Link>
          </li>
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? (
                <FaSun className="text-yellow-500" />
              ) : (
                <FaMoon className="text-gray-600" />
              )}
            </button>
          </li>

          {!isLoggedIn ? (
            <li>
              <Link
                to="/login"
                className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 text-lg"
              >
                Login
              </Link>
            </li>
          ) : (
            <li className="relative" ref={dropdownRef}>
              <button
                className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg hover:bg-green-600 transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {firstLetter}
              </button>

              {isDropdownOpen && (
                <ul
                  className={`absolute right-0 mt-2 shadow-lg rounded-lg border py-2 min-w-[180px] max-w-[250px] z-50 ${
                    isDarkMode
                      ? "dark:bg-gray-700 dark:border-gray-600"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <li
                    className={`px-5 py-3 transition-colors ${
                      isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
                    }`}
                  >
                    <Link
                      to="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  {user?.role === "admin" && (
                    <li
                      className={`px-5 py-3 transition-colors ${
                        isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
                      }`}
                    >
                      <Link
                        to="/admin"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    </li>
                  )}
                  <li
                    className={`px-5 py-3 transition-colors ${
                      isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
                    }`}
                  >
                    <Link
                      to="/profile-update"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Update Profile
                    </Link>
                  </li>
                  <li
                    className={`px-5 py-3 transition-colors ${
                      isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
                    }`}
                  >
                    <Link
                      to="/complaints"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      My Complaints
                    </Link>
                  </li>
                  <li className="px-5 py-3 hover:bg-gray-100 transition-colors">
                    <Link
                      to="/my-courses"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      My Courses
                    </Link>
                  </li>
                  <li className="px-5 py-3 hover:bg-gray-100 transition-colors">
                    <Link
                      to="/connections"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Connections
                    </Link>
                  </li>
                  <li
                    className={`px-5 py-3 transition-colors ${
                      isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
                    }`}
                  >
                    <Link
                      to="/requests"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Requests Received
                    </Link>
                  </li>
                  {user?.teachingCourses?.length > 0 && (
                    <li className="px-5 py-3 hover:bg-gray-100 transition-colors">
                      <Link
                        to="/courses-teaching"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Courses I'm Teaching
                      </Link>
                    </li>
                  )}
                  <li
                    className={`border-t mt-2 pt-2 ${
                      isDarkMode ? "border-gray-600" : "border-gray-200"
                    }`}
                  >
                    <button
                      className={`px-5 py-3 cursor-pointer w-full text-left transition-colors ${
                        isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl sm:text-3xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`md:hidden shadow-lg px-4 sm:px-6 py-6 text-base ${
            isDarkMode ? "dark:bg-gray-800 dark:text-white" : "bg-white"
          }`}
        >
          <ul className="flex flex-col gap-4 sm:gap-6">
            <li>
              <Link to="/explore">Explore</Link>
            </li>
            <li>
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                className={`border rounded-full px-4 py-2.5 w-full outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base ${
                  isDarkMode
                    ? "dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    : ""
                }`}
              />
            </li>
            <li>
              <Link
                to="/teach"
                className="hover:text-green-500 dark:hover:text-green-400"
              >
                Teach With Us
              </Link>
            </li>
            <li>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {isDarkMode ? (
                  <FaSun className="text-yellow-500" />
                ) : (
                  <FaMoon className="text-gray-600" />
                )}
              </button>
            </li>
            {!isLoggedIn ? (
              <li>
                <Link
                  to="/login"
                  className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 block text-center transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-green-500 dark:hover:text-green-400 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                {user?.role === "admin" && (
                  <li>
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="hover:text-green-500 dark:hover:text-green-400 transition-colors"
                    >
                      Admin Panel
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/profile-update"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-green-500 dark:hover:text-green-400 transition-colors"
                  >
                    Update Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/complaints"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-green-500 dark:hover:text-green-400 transition-colors"
                  >
                    My Complaints
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-courses"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-green-500 dark:hover:text-green-400 transition-colors"
                  >
                    My Courses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/connections"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-green-500 dark:hover:text-green-400 transition-colors"
                  >
                    Connections
                  </Link>
                </li>
                <li>
                  <Link
                    to="/requests"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-green-500 dark:hover:text-green-400 transition-colors"
                  >
                    Requests Received
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="cursor-pointer w-full text-left hover:text-green-500 dark:hover:text-green-400 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
