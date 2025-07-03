import { Outlet } from "react-router";
import Navbar from "../src/components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 min-h-screen">
        {/* inspect tool- navbar height = 68px + footer height 164px = 232px */}
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default App;
