import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainSideBar from "../includes/MainSideBar";
import { Plus, Trash, Pencil } from "lucide-react";
import axios from "axios";

function MainDocForms() {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [isRequired, setIsRequired] = useState(true);
  const [fieldOrder, setFieldOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");

    if (!userData) {
      // If no user data, redirect to login
      navigate("/oabps/main/login");
      return;
    }

    // Fetch categories
    fetchCategories();
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://oabs-f7by.onrender.com/api/category/all");
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleAddForm = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCategoryId("");
    setFieldName("");
    setFieldType("");
    setIsRequired(true);
    setFieldOrder("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://oabs-f7by.onrender.com/api/form/add",
        {
          categoryId,
          fieldName,
          fieldType,
          isRequired,
          fieldOrder: parseInt(fieldOrder),
        }
      );

      if (response.data.success) {
        alert("Form field added successfully!");
        handleCloseModal();
        // Optionally refresh the form fields list here
      } else {
        setError(response.data.message || "Failed to add form field");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error adding form field");
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
              <h4 className="mb-0">Document Forms</h4>
              <div>
                <button className="btn btn-outline-secondary me-2" onClick={handleAddForm}>
                  <Plus /> Add Form
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
                      <th>Field Name</th>
                      <th>Field Type</th>
                      <th>Is Required</th>
                      <th>Field Order</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    <tr>
                      <td></td>
                      <td></td>
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

        {/* Add Form Modal */}
        {showModal && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Form Field</h5>
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
                      <label htmlFor="categoryId" className="form-label">Category Name</label>
                      <select
                        className="form-select"
                        id="categoryId"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                        disabled={loading}
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.category_id} value={category.category_id}>
                            {category.category_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="fieldName" className="form-label">Field Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fieldName"
                        value={fieldName}
                        onChange={(e) => setFieldName(e.target.value)}
                        placeholder="e.g., Business Name"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="fieldType" className="form-label">Field Type</label>
                      <select
                        className="form-select"
                        id="fieldType"
                        value={fieldType}
                        onChange={(e) => setFieldType(e.target.value)}
                        required
                        disabled={loading}
                      >
                        <option value="">Select Field Type</option>
                        <option value="TEXT">TEXT</option>
                        <option value="NUMBER">NUMBER</option>
                        <option value="DATE">DATE</option>
                        <option value="SELECT">SELECT</option>
                        <option value="FILE">FILE</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Is Required</label>
                      <div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="isRequired"
                            id="requiredTrue"
                            value="true"
                            checked={isRequired === true}
                            onChange={() => setIsRequired(true)}
                            disabled={loading}
                          />
                          <label className="form-check-label" htmlFor="requiredTrue">
                            True
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="isRequired"
                            id="requiredFalse"
                            value="false"
                            checked={isRequired === false}
                            onChange={() => setIsRequired(false)}
                            disabled={loading}
                          />
                          <label className="form-check-label" htmlFor="requiredFalse">
                            False
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="fieldOrder" className="form-label">Field Order</label>
                      <input
                        type="number"
                        className="form-control"
                        id="fieldOrder"
                        value={fieldOrder}
                        onChange={(e) => setFieldOrder(e.target.value)}
                        placeholder="e.g., 1"
                        min="1"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal} disabled={loading}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? "Adding..." : "Add Form Field"}
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

export default MainDocForms