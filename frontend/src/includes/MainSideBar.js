import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  History,
  Users,
  User,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
  Folders,
  X,
  CreditCard,
  ClipboardClock,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function MainSideBar({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("dashboard");
  const [expandedItems, setExpandedItems] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Update active item based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const findActiveItem = (items) => {
      for (const item of items) {
        if (item.path === currentPath) {
          return item.id;
        }
        if (item.children) {
          for (const child of item.children) {
            if (child.path === currentPath) {
              setExpandedItems((prev) => ({
                ...prev,
                [item.id]: true,
              }));
              return child.id;
            }
          }
        }
      }
      return "dashboard";
    };

    setActiveItem(findActiveItem(menuItems));
  }, [location.pathname]);

  const toggleExpanded = (item) => {
    setExpandedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleItemClick = (item) => {
    setActiveItem(item.id);

    if (item.children && item.children.length > 0) {
      toggleExpanded(item.id);
    } else {
      // Navigate to the path
      navigate(item.path);
    }
  };

  const handleChildClick = (child, parentId) => {
    setActiveItem(child.id);
    navigate(child.path);
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/main/dashboard",
    },
    {
      id: "documents",
      label: "Documents",
      icon: FolderOpen,
      path: "/main/maindoc",
    },
    { 
      id: 'categories', 
      label: 'Document Categories', 
      icon: Folders, 
      path: '/main/doccat',
    },
    { 
      id: 'requests', 
      label: 'Requests', 
      icon: ClipboardClock, 
      path: '/main/mainreq',
    },
    { 
      id: 'payment', 
      label: 'Payments', 
      icon: CreditCard, 
      path: '/main/mainpay',
    },
    { 
      id: 'transaction', 
      label: 'Transactions', 
      icon: History, 
      path: '/main/transactions' 
    },
    {
      id: "roles",
      label: "Roles",
      icon: Users,
      path: "/main/roles",
    },
    {
      id: "users",
      label: "Users",
      icon: User,
      path: "/main/mainusers",
    },
    {
      id: "login-audits",
      label: "Login Audits",
      icon: History,
      path: "/main/logaudit",
    },
    {
      id: "others",
      label: "Others",
      icon: FolderOpen,
      path: "/others",
      children: [
        {
          id: "other1",
          label: "other1",
          path: "",
        },
        {
          id: "other2",
          label: "other2",
          path: "",
        },
        { id: "other3", label: "other3", path: "" },
      ],
    },
  ];

  const SidebarItem = ({ item }) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.id];
    const isActive = activeItem === item.id;

    return (
      <div className="mb-1">
        <div
          className={`d-flex align-items-center p-3 text-decoration-none msidebar-item ${
            isActive ? "active" : ""
          }`}
          onClick={() => handleItemClick(item)}
          style={{ cursor: "pointer" }}
        >
          <Icon size={20} className="me-3" />
          <span className="flex-grow-1">{item.label}</span>
          {hasChildren &&
            (isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            ))}
        </div>
        {hasChildren && isExpanded && (
          <div className="ps-4">
            {item.children.map((child) => (
              <div
                key={child.id}
                className={`d-flex align-items-center p-2 ps-5 text-decoration-none msidebar-item ${
                  activeItem === child.id ? "active" : ""
                }`}
                onClick={() => handleChildClick(child, item.id)}
                style={{ cursor: "pointer" }}
              >
                <span>{child.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="min-vh-100 bg-light">
        <div className="d-flex">
          {/* Sidebar */}
          <div
            className={`msidebar ${
              !sidebarOpen ? "collapsed" : ""
            } position-relative`}
          >
            <div className="p-3 border-bottom">
              <div className="d-flex align-items-center">
                <div
                  className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: "32px", height: "32px" }}
                >
                  <span className="text-white fw-bold">D</span>
                </div>
                <h5 className="mb-0 fw-bold">DMS</h5>
              </div>
            </div>

            <div
              className="p-2 flex-grow-1"
              style={{ overflowY: "auto", height: "calc(100vh - 80px)" }}
            >
              {menuItems.map((item) => (
                <SidebarItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div
            className={`flex-grow-1 mmain-content bg-dark bg-opacity-10 ${
              !sidebarOpen ? "expanded" : ""
            }`}
          >
            {/* Header */}
            <div className="bg-white p-3 border-bottom d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-link p-0 me-3"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <h4 className="mb-0">Dashboard</h4>
              </div>

              <div className="d-flex align-items-center">
                <Link to="/loginfinal/main">
                  <LogOut className="text-secondary me-3" size={20} />
                </Link>
              </div>
            </div>

            {/* Dashboard Content */}
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainSideBar;
