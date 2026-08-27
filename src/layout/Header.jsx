import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { resetData } from "../utils/storage";

const Header = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    resetData()
    navigate("/login")
  }

  const handleNotifications = () => {
    navigate("/notification")
  }

  return (
    <div className="flex items-center justify-between bg-gray-50 py-2 h-[75px] px-6">
      <section className="w-full flex items-center">
        <div className="flex-1 flex justify-start">
          <p className="text-2xl tracking-wide font-semibold text-secondary uppercase">
            Savvy Streamer Admin Portal
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {/* <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow cursor-pointer hover:bg-gray-100" onClick={handleNotifications}>
            <Bell className="text-primary w-5 h-5" />
          </div> */}
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow cursor-pointer hover:bg-gray-100" onClick={handleLogout}>
            <LogOut className="text-primary w-5 h-5" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
