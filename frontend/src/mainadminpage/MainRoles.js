import MainSideBar from "../includes/MainSideBar";
import { Plus, Trash, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MainRoles() {
  const [searchName, setSearchName] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Barangay Clearance", "Occupancy Permit"];

  const navigate = useNavigate();
  const [username, setUsername] = useState("User");

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");

    if (!userData) {
      // If no user data, redirect to login
      navigate("/oabps/main/login");
      return;
    }

    try {
      const user = JSON.parse(userData);
      // Set username from user data
      setUsername(user.username || user.fullname || "User");
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/oabps/main/login");
    }
  }, [navigate]);
  return (
    <>
      <MainSideBar>
        <div className="container-fluid p-4">
          {/* Header */}

          <div className="bg-light p-4 border-bottom text-center mb-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">Admins</h4>
              <div>
                <button className="btn btn-outline-secondary me-2">
                  <Plus /> Add Admin
                </button>
              </div>
            </div>

            <hr />

            {/* Table */}
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Role</th>
                    <th>Assigned Document</th>
                    <th>Status</th>
                    <th>Created Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Paiz</td>
                    <td>Admin</td>
                    <td>All</td>
                    <td>Active</td>
                    <td>00-00-000</td>
                    <td>
                      <button className="btn btn-sm">
                        <Pencil className="text-primary" />
                      </button>
                      <button className="btn btn-sm">
                        <Trash className="text-danger" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </MainSideBar>
    </>
  );
}

export default MainRoles;
