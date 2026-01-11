import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const location = useLocation();
  const isStacksPage = location.pathname === "/";

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">


      <Header />


      <div className="flex-1 overflow-hidden flex">




        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>

    </div>
  );
}
