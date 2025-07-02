import { NavLink } from "react-router";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          📚 Library
        </h1>
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
