import { Outlet } from "react-router";
import Navbar from "../src/components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
