import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  User,
  FileText,
  CreditCard,
  Library,
  Menu,
  FileDown,
  House,
} from "lucide-react";
 // Import the external CSS file

function UserSidebar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState({});
  const location = useLocation();

  const toggleMenu = (menuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  // Check if current path matches any menu item
  const isActiveItem = (path) => {
    return location.pathname === path;
  };

  // Check if any submenu item under Business Services is active
  const isBusinessServicesActive = () => {
    return (
      location.pathname.includes("/business/") ||
      location.pathname === "/business/new-application/checklist" ||
      location.pathname === "/business/renewal"
    );
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`sidebar ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        } bg-white shadow-lg`}
      >
        {/* Sidebar Header */}
        <div className="p-3 border-bottom">
          <div className="d-flex align-items-center">
            <Link to="/dasboard" className="text-decoration-none">
              <div className="logo-circle me-3">
                <div className="logo-inner"></div>
              </div>
            </Link>

            {sidebarOpen && (
              <Link to="/dasboard" className="text-decoration-none">
                <h5 className="mb-0 fw-bold text-dark">Online BPLS</h5>
              </Link>
            )}
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="p-2 flex-grow-1">
          {/* Dashboard Link */}
          <Link
            to="/dasboard"
            className={`sidebar-submenu-item btn w-100 d-flex align-items-center justify-content-between p-3 text-start text-decoration-none ${
              isActiveItem("/dasboard") ? "active" : ""
            }`}
          >
            <div className="d-flex align-items-center">
              <House size={20} />
              {sidebarOpen && <span className="ms-3 fw-medium">Dashboard</span>}
            </div>
          </Link>

          {/* Business Services Dropdown */}
          <div className="mb-2">
            <button
              onClick={() => toggleMenu("businessServices")}
              className={`sidebar-menu-item btn w-100 d-flex align-items-center justify-content-between p-3 text-start ${
                isBusinessServicesActive() ? "active" : ""
              }`}
            >
              <div className="d-flex align-items-center">
                <FileText size={20} />
                {sidebarOpen && (
                  <span className="ms-3 fw-medium">Business Services</span>
                )}
              </div>
              {sidebarOpen &&
                (expandedMenus["businessServices"] ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                ))}
            </button>

            {sidebarOpen && expandedMenus["businessServices"] && (
              <div className="ms-4 mt-1">
                <Link
                  to="/business/new-application/checklist"
                  className={`sidebar-submenu-item btn w-100 text-start p-2 small text-decoration-none ${
                    isActiveItem("/business/new-application/checklist") ? "active" : ""
                  }`}
                >
                  New Application
                </Link>
                <Link
                  to="/business/renewal"
                  className={`sidebar-submenu-item btn w-100 text-start p-2 small text-decoration-none ${
                    isActiveItem("/business/renewal") ? "active" : ""
                  }`}
                >
                  Renewal Services
                </Link>
              </div>
            )}
          </div>

          {/* Transactions Link */}
          <Link
            to="/transactions/my-transactions"
            className={`sidebar-submenu-item btn w-100 d-flex align-items-center justify-content-between p-3 text-start text-decoration-none ${
              isActiveItem("/transactions/my-transactions") ? "active" : ""
            }`}
          >
            <div className="d-flex align-items-center">
              <CreditCard size={20} />
              {sidebarOpen && (
                <span className="ms-3 fw-medium">Transactions</span>
              )}
            </div>
          </Link>

          {/* Application Forms Link */}
          <Link
            to="/documents/forms"
            className={`sidebar-submenu-item btn w-100 d-flex align-items-center justify-content-between p-3 text-start text-decoration-none ${
              isActiveItem("/documents/forms") ? "active" : ""
            }`}
          >
            <div className="d-flex align-items-center">
              <Library size={20} />
              {sidebarOpen && (
                <span className="ms-3 fw-medium">Application Forms</span>
              )}
            </div>
          </Link>

          {/* Downloadables Link */}
          <Link
            to="/documents/downloadables"
            className={`sidebar-submenu-item btn w-100 d-flex align-items-center justify-content-between p-3 text-start text-decoration-none ${
              isActiveItem("/documents/downloadables") ? "active" : ""
            }`}
          >
            <div className="d-flex align-items-center">
              <FileDown size={20} />
              {sidebarOpen && (
                <span className="ms-3 fw-medium">Downloadables</span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`main-content ${
          sidebarOpen ? "main-content-open" : "main-content-closed"
        } d-flex flex-column w-100`}
      >
        {/* Top Navigation */}
        <nav className="navbar navbar-dark bg-dark px-3">
          <div className="d-flex align-items-center w-100 justify-content-between">
            <div className="d-flex align-items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="btn btn-outline-light me-3"
                aria-label="Toggle sidebar"
              >
                <Menu size={20} />
              </button>
              <Link
                to="/dasboard"
                className="d-flex align-items-center text-decoration-none"
              >
                <div className="logo-circle me-3">
                  <div className="logo-inner"></div>
                </div>
                <h4 className="navbar-brand mb-0 text-white">Online BPLS</h4>
              </Link>
            </div>
            <div className="d-flex align-items-center me-4">
              <Link 
                to="/loginfinal/user" 
                className="btn btn-outline-light"
                aria-label="User profile"
              >
                <User size={20} />
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content - This will render whatever is passed as children */}
        <main className="flex-grow-1 p-4">
          <div className="container-fluid">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default UserSidebar;