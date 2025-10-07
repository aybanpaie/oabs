import { Plus, Trash, Pencil, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainSideBar from "../includes/MainSideBar";
import axios from "axios";

function MainDocCategory() {

    const [searchName, setSearchName] = useState("");
      const [searchTags, setSearchTags] = useState("");
      const [selectedCategory, setSelectedCategory] = useState("");
      const [showModal, setShowModal] = useState(false);
      const [categoryName, setCategoryName] = useState("");
      const [description, setDescription] = useState("");
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");

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

  const handleAddCategory = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCategoryName("");
    setDescription("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://oabs-f7by.onrender.com/api/category/add",
        {
          categoryName,
          description,
        }
      );

      if (response.data.success) {
        alert("Category added successfully!");
        handleCloseModal();
        // Optionally refresh the categories list here
      } else {
        setError(response.data.message || "Failed to add category");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error adding category");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <MainSideBar>
        <div className="container-fluid p-4">
          <div className="bg-light p-4 border-bottom text-center mb-4 shadow-sm">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">Document Category</h4>
              <div>
                <button className="btn btn-outline-secondary me-2" onClick={handleAddCategory}>
                  <Plus /> Add Category
                </button>
              </div>
            </div>
            <hr className="my-0" />
            <div className="bg-light p-4 border-bottom text-center mb-4 shadow-sm">
              {/* Table */}
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Category Name</th>
                      <th>Description</th>
                      <th>Date Added</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
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
        </div>

        {/* Add Category Modal */}
        {showModal && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Category</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    <div className="mb-3">
                      <label htmlFor="categoryName" className="form-label">Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        disabled={loading}
                      ></textarea>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal} disabled={loading}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? "Adding..." : "Add Category"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </MainSideBar>
    </>
  )
}

export default MainDocCategory