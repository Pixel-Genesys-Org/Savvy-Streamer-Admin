import { ChevronDown, KeyRound, LogOut, Menu, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import { useGetMyProfileQuery } from "../redux/apis/User";
import { extractData, resetData } from "../utils/storage";

const PAGE_TITLES = {
  dashboard: "Dashboard",
  users: "Users Management",
  search: "Search Monitoring",
  queries: "Query Management",
  content: "Content Management",
  payments: "Payment Logs",
  profile: "My Profile",
  "change-password": "Change Password",
  "coming-soon": "Coming Soon",
};

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const cachedUser = extractData("user");
  const { data } = useGetMyProfileQuery(undefined, { skip: !cachedUser });
  const user = data?.data?.user || cachedUser || {};

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    resetData();
    navigate("/login");
  };

  const segment = location.pathname.split("/").filter(Boolean)[0] || "dashboard";
  const pageTitle = PAGE_TITLES[segment] || "Admin Portal";

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-secondary/70 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="flex h-14 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-primary/40 hover:bg-primary/15 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <div className="min-w-0">
            <p className="font-heading truncate text-base font-semibold tracking-wide text-white sm:text-lg">
              {pageTitle}
            </p>
            <p className="hidden text-xs text-muted sm:block">Savvy Streamer Admin</p>
          </div>
        </div>

        <div className="relative shrink-0" ref={menuRef}>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1 pr-3 pl-1 text-sm text-white transition hover:border-primary/50 hover:bg-primary/15"
            aria-label="Account menu"
          >
            <Avatar src={user?.image_url} name={user?.name} size="sm" />
            <span className="hidden max-w-[140px] truncate sm:inline">{user?.name || "Admin"}</span>
            <ChevronDown size={14} className={`text-muted transition ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div className="glass-panel absolute top-12 right-0 z-50 w-48 overflow-hidden rounded-2xl py-2 shadow-xl">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate("/profile");
                }}
                className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm text-white transition hover:bg-primary/15"
              >
                <UserRound size={16} className="text-cyan" />
                My Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate("/change-password");
                }}
                className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm text-white transition hover:bg-primary/15"
              >
                <KeyRound size={16} className="text-primary" />
                Change Password
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm text-white transition hover:bg-primary/15"
              >
                <LogOut size={16} className="text-primary" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
