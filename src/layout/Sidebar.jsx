import {
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  MessageCircle,
  Paperclip,
  Search,
  Users
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { images } from "../assets";

const menu = [
  {
    icon: <LayoutGrid size={20} />,
    label: "DASHBOARD",
    route: "dashboard",
  },
  {
    icon: <Users size={20} />,
    label: "USERS MANAGEMENT",
    route: "users"
  },
  {
    icon: <Search size={20} />,
    label: "SEARCH MONITORING",
    route: "search"
  },
  {
    icon: <MessageCircle size={20} />,
    label: "QUERY MANAGEMENT",
    route: "queries",
  },
  {
    icon: <Paperclip size={20} />,
    label: "CONTENT MANAGEMENT",
    route: "content",
  }
];

const Sidebar = () => {

  const [expandedIdx, setExpandedIdx] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveRoute = (route) => !location.pathname.includes("coming-soon") && location.pathname.includes(route);

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

  const handleRouteToDashboard = (route) => {
    navigate(`/dashboard`);
  };

  return (
    <div className="fixed left-0 top-[75px] h-[calc(100vh-75px)] w-[280px] bg-secondary border-r border-gray-200 shadow-sm overflow-y-auto">
      <section className="flex items-center justify-center cursor-pointer pt-6 px-4">
        <img
          onClick={handleRouteToDashboard}
          src={images.logo}
          className="w-[60%] object-contain"
        />
      </section>
      <div className="flex flex-col pt-6">
        {menu.map((item, idx) => {
          const hasChildren = Array.isArray(item.children);
          const isExpanded = expandedIdx === idx;
          const isMainActive = !hasChildren && isActiveRoute(item.route);
          const isAnyChildActive =
            hasChildren &&
            item.children?.some((child) => isActiveRoute(child.route));

          return (
            <div key={idx} className="w-full">
              <div
                onClick={() =>
                  handleMenuClick(idx, item.route, hasChildren)
                }
                className={`flex justify-between items-center gap-2 px-6 py-3 text-sm cursor-pointer transition-all
                ${isMainActive || isAnyChildActive
                    ? "bg-primary/10 text-primary border-l-4 border-primary"
                    : "hover:bg-primary/10 text-white border-l-4 border-transparent"
                  }`}
              >
                <div className="flex items-center gap-3 w-full">
                  <span>{item.icon}</span>
                  <span className="whitespace-nowrap">{item.label}</span>
                </div>
                {hasChildren && (
                  <span>
                    {isExpanded ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </span>
                )}
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50
                ${isExpanded ? "max-h-60 py-2" : "max-h-0 py-0"}`}
              >
                {hasChildren &&
                  item.children.map((child, childIdx) => {
                    const isChildActive = isActiveRoute(child.route);
                    return (
                      <div
                        key={childIdx}
                        onClick={() => handleSubItemClick(child.route)}
                        className={`pl-12 pr-4 py-2 text-xs cursor-pointer transition-colors
                          ${isChildActive
                            ? "text-primary"
                            : "text-gray-600 hover:text-primary"
                          }`}
                      >
                        {child.label}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
