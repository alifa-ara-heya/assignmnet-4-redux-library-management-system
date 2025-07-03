const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        {/* Left Section */}
        <div>
          <h2 className="text-lg font-semibold">📚 Minimal Library System</h2>
          <p className="text-sm text-gray-400">
            A React + Redux app for managing your personal book collection.
          </p>
        </div>

        {/* Center Section */}
        {/*  <div>
          <ul className="flex space-x-4 text-sm">
            <li>
              <a href="/books" className="hover:underline">
                Books
              </a>
            </li>
            <li>
              <a href="/create-book" className="hover:underline">
                Add Book
              </a>
            </li>
            <li>
              <a href="/borrow-summary" className="hover:underline">
                Summary
              </a>
            </li>
          </ul>
        </div> */}

        {/* Right Section */}
        <div className="text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
