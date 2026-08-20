import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div
      className="flex h-screen"
      style={{ background: "#0B0C10" }}
    >
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main
          className="flex-1 overflow-y-auto p-6"
          style={{ background: "linear-gradient(180deg, #13151F 0%, #0B0C10 100%)" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
