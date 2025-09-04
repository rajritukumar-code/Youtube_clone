import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import MiniSidebar from "./components/MiniSidebar.jsx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import useActivePath from "./helpers/useActivePath.js";
export const NavContext = createContext({});

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const isActivePath = useActivePath();

  // function to handle search
  const handleSearch = (query) => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    setSearchQuery(query);
  };

  // useEffect hook for route change handling and scrolling to top of the page on route change
  useEffect(() => {
    handleRouteChange();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <NavContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isActivePath,
        searchQuery,
        handleSearch,
        showProfile,
        setShowProfile,
      }}
    >
      <div className="min-h-full top-0 right-0 left-0.5 absolute  overflow-hidden  bg-white text-black ">
        <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        {!isActivePath("/watch/") && (
          <MiniSidebar onClose={() => setIsSidebarOpen(false)} />
        )}

        <div className="relative h-full  overflow-y-scroll">
          <main
            className={`h-full ${
              isActivePath("/", true) && isSidebarOpen
                ? "md:pl-18 xl:pl-60"
                : "md:pl-18"
            } pt-14 px-3`}
          >
            <Outlet />
          </main>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
      />
    </NavContext.Provider>
  );
}

export default App;
