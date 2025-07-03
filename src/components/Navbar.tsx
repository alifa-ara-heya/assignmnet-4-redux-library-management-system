import { Link, NavLink } from "react-router";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 shadow backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            📚 Library
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive ? "active-nav" : "inactive-nav"
            }
          >
            All Books
          </NavLink>
          <NavLink
            to="/create-book"
            className={({ isActive }) =>
              isActive ? "active-nav" : "inactive-nav"
            }
          >
            Add Book
          </NavLink>
          <NavLink
            to="/borrow-summary"
            className={({ isActive }) =>
              isActive ? "active-nav" : "inactive-nav"
            }
          >
            Borrow Summary
          </NavLink>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
