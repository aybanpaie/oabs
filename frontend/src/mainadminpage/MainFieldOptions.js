import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainSideBar from "../includes/MainSideBar";
import { Plus, Trash, Pencil } from "lucide-react";
import axios from "axios";

function MainFieldOptions() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [options, setOptions] = useState([]);
  const [formId, setFormId] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const [optionOrder, setOptionOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingOption, setEditingOption] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");

    if (!userData) {
      // If no user data, redirect to login
      navigate("/oabps/main/login");
      return;
    }

    // Fetch form fields (SELECT type only) and options
    fetchFormFields();
    fetchOptions();
  }, [navigate]);

  const fetchFormFields = async () => {
    try {
      const response = await axios.get("https://oabs-f7by.onrender.com/api/form/all");
      if (response.data.success) {
        // Filter only SELECT type fields
        const selectFields = response.data.formFields.filter(
          (field) => field.field_type === "SELECT"
        );
        setFormFields(selectFields);
      }
    } catch (err) {
      console.error("Error fetching form fields:", err);
    }
  };

  const fetchOptions = async () => {
    try {
      const response = await axios.get("https://oabs-f7by.onrender.com/api/option/all");
      if (response.data.success) {
        setOptions(response.data.options);
      }
    } catch (err) {
      console.error("Error fetching options:", err);
    }
  };

  const handleAddOption = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormId("");
    setOptionValue("");
    setOptionOrder("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://oabs-f7by.onrender.com/api/option/add",
        {
          formId,
          optionValue,
          optionOrder: parseInt(optionOrder),
        }
      );

      if (response.data.success) {
        alert("Field option added successfully!");
        handleCloseModal();
        fetchOptions();
      } else {
        setError(response.data.message || "Failed to add field option");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error adding field option");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (option) => {
    setEditingOption(option);
    setFormId(option.form_id);
    setOptionValue(option.option_value);
    setOptionOrder(option.option_order);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingOption(null);
    setFormId("");
    setOptionValue("");
    setOptionOrder("");
    setError("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.put(
        `https://oabs-f7by.onrender.com/api/option/update/${editingOption.option_id}`,
        {
          formId,
          optionValue,
          optionOrder: parseInt(optionOrder),
        }
      );

      if (response.data.success) {
        alert("Field option updated successfully!");
        handleCloseEditModal();
        fetchOptions();
      } else {
        setError(response.data.message || "Failed to update field option");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error updating field option");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (optionId) => {
    if (!window.confirm("Are you sure you want to delete this field option?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `https://oabs-f7by.onrender.com/api/option/delete/${optionId}`
      );

      if (response.data.success) {
        alert("Field option deleted successfully!");
        fetchOptions();
      } else {
        alert(response.data.message || "Failed to delete field option");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting field option");
    }
  };

  return (
    <>
      <MainSideBar>
        <div className="container-fluid p-4">
          <div className="bg-light p-4 border-bottom text-center mb-4 shadow-sm">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">Field Options</h4>
              <div>
                <button className="btn btn-outline-secondary me-2" onClick={handleAddOption}>
                  <Plus /> Add Option
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
                      <th>Form Field</th>
                      <th>Option Value</th>
                      <th>Option Order</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {options.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No field options found
                        </td>
                      </tr>
                    ) : (
                      options.map((option, index) => (
                        <tr key={option.option_id}>
                          <td>{index + 1}</td>
                          <td>
                            {formFields.find((field) => field.form_id === option.form_id)
                              ?.field_name || "N/A"}
                          </td>
                          <td>{option.option_value}</td>
                          <td>{option.option_order}</td>
                          <td>
                            <button className="btn btn-sm" onClick={() => handleEdit(option)}>
                              <Pencil className="text-primary" />
                            </button>
                            <button className="btn btn-sm" onClick={() => handleDelete(option.option_id)}>
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

        {/* Add Option Modal */}
        {showModal && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Field Option</h5>
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
                      <label htmlFor="formId" className="form-label">Form Field (SELECT type)</label>
                      <select
                        className="form-select"
                        id="formId"
                        value={formId}
                        onChange={(e) => setFormId(e.target.value)}
                        required
                        disabled={loading}
                      >
                        <option value="">Select Form Field</option>
                        {formFields.map((field) => (
                          <option key={field.form_id} value={field.form_id}>
                            {field.field_name}
                          </option>
                        ))}
                      </select>
                      <small className="text-muted">
                        Only fields with type SELECT are shown
                      </small>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="optionValue" className="form-label">Option Value</label>
                      <input
                        type="text"
                        className="form-control"
                        id="optionValue"
                        value={optionValue}
                        onChange={(e) => setOptionValue(e.target.value)}
                        placeholder="e.g., 1st Year"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="optionOrder" className="form-label">Option Order</label>
                      <input
                        type="number"
                        className="form-control"
                        id="optionOrder"
                        value={optionOrder}
                        onChange={(e) => setOptionOrder(e.target.value)}
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
                      {loading ? "Adding..." : "Add Option"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Option Modal */}
        {showEditModal && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Field Option</h5>
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
                      <label htmlFor="editFormId" className="form-label">Form Field (SELECT type)</label>
                      <select
                        className="form-select"
                        id="editFormId"
                        value={formId}
                        onChange={(e) => setFormId(e.target.value)}
                        required
                        disabled={loading}
                      >
                        <option value="">Select Form Field</option>
                        {formFields.map((field) => (
                          <option key={field.form_id} value={field.form_id}>
                            {field.field_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editOptionValue" className="form-label">Option Value</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editOptionValue"
                        value={optionValue}
                        onChange={(e) => setOptionValue(e.target.value)}
                        placeholder="e.g., 1st Year"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editOptionOrder" className="form-label">Option Order</label>
                      <input
                        type="number"
                        className="form-control"
                        id="editOptionOrder"
                        value={optionOrder}
                        onChange={(e) => setOptionOrder(e.target.value)}
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
                      {loading ? "Updating..." : "Update Option"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </MainSideBar>
    </>
  );
}

export default MainFieldOptions;
