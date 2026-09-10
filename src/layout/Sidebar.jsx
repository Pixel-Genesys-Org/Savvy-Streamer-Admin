import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  CreditCard,
  LayoutGrid,
  MessageCircle,
  Paperclip,
  Search,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { images } from "../assets";

const menu = [
  {
    icon: LayoutGrid,
    label: "Dashboard",
    route: "dashboard",
  },
  {
    icon: Users,
    label: "Users Management",
    route: "users",
  },
  {
    icon: Search,
    label: "Search Monitoring",
    route: "search",
  },
  {
    icon: MessageCircle,
    label: "Query Management",
    route: "queries",
  },
  {
    icon: Paperclip,
    label: "Content Management",
    route: "content",
  },
  {
    icon: CreditCard,
    label: "Payment Logs",
    route: "payments",
  },
];

const MARKETING_URL = import.meta.env.VITE_MARKETING_URL || "https://pixelgenesys.com";

const Sidebar = ({ open = false, onClose }) => {
  const [expandedIdx, setExpandedIdx] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveRoute = (route) =>
    !location.pathname.includes("coming-soon") && location.pathname.includes(route);

  const handleMenuClick = (idx, route, hasChildren) => {
    if (hasChildren) {
      setExpandedIdx(expandedIdx === idx ? null : idx);
    } else {
      navigate(`/${route}`);
    }
  };

  const handleSubItemClick = (route) => {
    navigate(`/${route}`);
  };

  const handleRouteToDashboard = () => {
    navigate(`/dashboard`);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <section className="flex items-center justify-between px-5 pt-6 pb-2">
        <button type="button" onClick={handleRouteToDashboard} className="flex-1 cursor-pointer">
          <img src={images.logo} alt="Savvy Streamer" className="mx-auto w-[70%] object-contain" />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/10 text-white lg:hidden"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </section>

      <div className="mt-6 flex flex-1 flex-col gap-1 px-3">
        {menu.map((item, idx) => {
          const hasChildren = Array.isArray(item.children);
          const isExpanded = expandedIdx === idx;
          const isMainActive = !hasChildren && isActiveRoute(item.route);
          const isAnyChildActive =
            hasChildren && item.children?.some((child) => isActiveRoute(child.route));
          const Icon = item.icon;

          return (
            <div key={idx} className="w-full">
              <button
                type="button"
                onClick={() => handleMenuClick(idx, item.route, hasChildren)}
                className={`group relative flex w-full cursor-pointer items-center justify-between gap-2 rounded-2xl px-4 py-3.5 text-base transition-all duration-200 ${
                  isMainActive || isAnyChildActive
                    ? "bg-gradient-to-r from-cyan/20 to-primary/20 text-white shadow-[0_0_24px_rgba(197,99,255,0.18)]"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                {(isMainActive || isAnyChildActive) && (
                  <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-cyan to-primary" />
                )}
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                      isMainActive || isAnyChildActive
                        ? "border-white/30 bg-white/10 text-white"
                        : "border-white/10 bg-white/5 text-white/80 group-hover:border-primary/40 group-hover:text-primary"
                    }`}
                  >
                    <Icon size={20} />
                  </span>
                  <span className="whitespace-nowrap font-semibold">{item.label}</span>
                </span>
                {hasChildren && (
                  <span>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </span>
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? "max-h-60 py-2" : "max-h-0 py-0"
                }`}
              >
                {hasChildren &&
                  item.children.map((child, childIdx) => {
                    const isChildActive = isActiveRoute(child.route);
                    return (
                      <button
                        type="button"
                        key={childIdx}
                        onClick={() => handleSubItemClick(child.route)}
                        className={`w-full cursor-pointer rounded-xl py-2 pr-4 pl-14 text-left text-sm transition-colors ${
                          isChildActive ? "text-primary" : "text-muted hover:text-primary"
                        }`}
                      >
                        {child.label}
                      </button>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto space-y-2 px-6 pb-6 pt-4 text-center">
        <div className="space-y-1">
          <p className="text-sm text-white/70">Designed and Developed By</p>
          <a
            href={MARKETING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-base font-bold text-white transition-colors hover:text-cyan"
          >
            Pixel Genesys LLC
          </a>
        </div>
        <p className="text-sm text-white/55">© {new Date().getFullYear()} Savvy Streamer</p>
      </div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 cursor-pointer bg-black/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside className="fixed top-0 left-0 z-40 hidden h-screen w-[280px] border-r border-white/10 bg-secondary/95 backdrop-blur-xl lg:block">
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 left-0 z-50 h-screen w-[280px] border-r border-white/10 bg-secondary lg:hidden"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
