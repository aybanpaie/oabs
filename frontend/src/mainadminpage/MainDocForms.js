import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainSideBar from "../includes/MainSideBar";
import { Plus, Trash, Pencil } from "lucide-react";
import axios from "axios";

function MainDocForms() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [isRequired, setIsRequired] = useState(true);
  const [fieldOrder, setFieldOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingField, setEditingField] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");

    if (!userData) {
      // If no user data, redirect to login
      navigate("/oabps/main/login");
      return;
    }

    // Fetch categories and form fields
    fetchCategories();
    fetchFormFields();
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

  const fetchFormFields = async () => {
    try {
      const response = await axios.get("https://oabs-f7by.onrender.com/api/form/all");
      if (response.data.success) {
        setFormFields(response.data.formFields);
      }
    } catch (err) {
      console.error("Error fetching form fields:", err);
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
        fetchFormFields(); // Refresh the form fields list
      } else {
        setError(response.data.message || "Failed to add form field");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error adding form field");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (field) => {
    setEditingField(field);
    setCategoryId(field.category_id);
    setFieldName(field.field_name);
    setFieldType(field.field_type);
    setIsRequired(field.is_required);
    setFieldOrder(field.field_order);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingField(null);
    setCategoryId("");
    setFieldName("");
    setFieldType("");
    setIsRequired(true);
    setFieldOrder("");
    setError("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.put(
        `https://oabs-f7by.onrender.com/api/form/update/${editingField.form_id}`,
        {
          categoryId,
          fieldName,
          fieldType,
          isRequired,
          fieldOrder: parseInt(fieldOrder),
        }
      );

      if (response.data.success) {
        alert("Form field updated successfully!");
        handleCloseEditModal();
        fetchFormFields(); // Refresh the form fields list
      } else {
        setError(response.data.message || "Failed to update form field");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error updating form field");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (formId) => {
    if (!window.confirm("Are you sure you want to delete this form field?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `https://oabs-f7by.onrender.com/api/form/delete/${formId}`
      );

      if (response.data.success) {
        alert("Form field deleted successfully!");
        fetchFormFields(); // Refresh the form fields list
      } else {
        alert(response.data.message || "Failed to delete form field");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting form field");
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
                    {formFields.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No form fields found
                        </td>
                      </tr>
                    ) : (
                      formFields.map((field, index) => (
                        <tr key={field.form_id}>
                          <td>{index + 1}</td>
                          <td>
                            {categories.find((cat) => cat.category_id === field.category_id)
                              ?.category_name || "N/A"}
                          </td>
                          <td>{field.field_name}</td>
                          <td>{field.field_type}</td>
                          <td>{field.is_required ? "Yes" : "No"}</td>
                          <td>{field.field_order}</td>
                          <td>
                            <button className="btn btn-sm" onClick={() => handleEdit(field)}>
                              <Pencil className="text-primary" />
                            </button>
                            <button className="btn btn-sm" onClick={() => handleDelete(field.form_id)}>
                              <Trash className="text-danger" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
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

        {/* Edit Form Modal */}
        {showEditModal && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Form Field</h5>
                  <button type="button" className="btn-close" onClick={handleCloseEditModal}></button>
                </div>
                <form onSubmit={handleUpdate}>
                  <div className="modal-body">
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    <div className="mb-3">
                      <label htmlFor="editCategoryId" className="form-label">Category Name</label>
                      <select
                        className="form-select"
                        id="editCategoryId"
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
                      <label htmlFor="editFieldName" className="form-label">Field Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editFieldName"
                        value={fieldName}
                        onChange={(e) => setFieldName(e.target.value)}
                        placeholder="e.g., Business Name"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editFieldType" className="form-label">Field Type</label>
                      <select
                        className="form-select"
                        id="editFieldType"
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
                            name="editIsRequired"
                            id="editRequiredTrue"
                            value="true"
                            checked={isRequired === true}
                            onChange={() => setIsRequired(true)}
                            disabled={loading}
                          />
                          <label className="form-check-label" htmlFor="editRequiredTrue">
                            True
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="editIsRequired"
                            id="editRequiredFalse"
                            value="false"
                            checked={isRequired === false}
                            onChange={() => setIsRequired(false)}
                            disabled={loading}
                          />
                          <label className="form-check-label" htmlFor="editRequiredFalse">
                            False
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editFieldOrder" className="form-label">Field Order</label>
                      <input
                        type="number"
                        className="form-control"
                        id="editFieldOrder"
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
                    <button type="button" className="btn btn-secondary" onClick={handleCloseEditModal} disabled={loading}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? "Updating..." : "Update Form Field"}
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