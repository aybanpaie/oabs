import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainSideBar from "../includes/MainSideBar";
import { Plus, Trash, Pencil } from "lucide-react";
import axios from "axios";

function MainFieldGroups() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupOrder, setGroupOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingGroup, setEditingGroup] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");

    if (!userData) {
      // If no user data, redirect to login
      navigate("/oabps/main/login");
      return;
    }

    // Fetch categories and groups
    fetchCategories();
    fetchGroups();
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

  const fetchGroups = async () => {
    try {
      const response = await axios.get("https://oabs-f7by.onrender.com/api/group/all");
      if (response.data.success) {
        setGroups(response.data.groups);
      }
    } catch (err) {
      console.error("Error fetching groups:", err);
    }
  };

  const handleAddGroup = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCategoryId("");
    setGroupName("");
    setGroupOrder("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://oabs-f7by.onrender.com/api/group/add",
        {
          categoryId,
          groupName,
          groupOrder: parseInt(groupOrder),
        }
      );

      if (response.data.success) {
        alert("Field group added successfully!");
        handleCloseModal();
        fetchGroups();
      } else {
        setError(response.data.message || "Failed to add field group");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error adding field group");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (group) => {
    setEditingGroup(group);
    setCategoryId(group.category_id);
    setGroupName(group.group_name);
    setGroupOrder(group.group_order);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingGroup(null);
    setCategoryId("");
    setGroupName("");
    setGroupOrder("");
    setError("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.put(
        `https://oabs-f7by.onrender.com/api/group/update/${editingGroup.group_id}`,
        {
          categoryId,
          groupName,
          groupOrder: parseInt(groupOrder),
        }
      );

      if (response.data.success) {
        alert("Field group updated successfully!");
        handleCloseEditModal();
        fetchGroups();
      } else {
        setError(response.data.message || "Failed to update field group");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error updating field group");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (groupId) => {
    if (!window.confirm("Are you sure you want to delete this field group?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `https://oabs-f7by.onrender.com/api/group/delete/${groupId}`
      );

      if (response.data.success) {
        alert("Field group deleted successfully!");
        fetchGroups();
      } else {
        alert(response.data.message || "Failed to delete field group");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting field group");
    }
  };

  return (
    <>
      <MainSideBar>
        <div className="container-fluid p-4">
          <div className="bg-light p-4 border-bottom text-center mb-4 shadow-sm">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">Field Groups</h4>
              <div>
                <button className="btn btn-outline-secondary me-2" onClick={handleAddGroup}>
                  <Plus /> Add Group
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
                      <th>Group Name</th>
                      <th>Group Order</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No field groups found
                        </td>
                      </tr>
                    ) : (
                      groups.map((group, index) => (
                        <tr key={group.group_id}>
                          <td>{index + 1}</td>
                          <td>
                            {categories.find((cat) => cat.category_id === group.category_id)
                              ?.category_name || "N/A"}
                          </td>
                          <td>{group.group_name}</td>
                          <td>{group.group_order}</td>
                          <td>
                            <button className="btn btn-sm" onClick={() => handleEdit(group)}>
                              <Pencil className="text-primary" />
                            </button>
                            <button className="btn btn-sm" onClick={() => handleDelete(group.group_id)}>
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

        {/* Add Group Modal */}
        {showModal && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Field Group</h5>
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
                      <label htmlFor="groupName" className="form-label">Group Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="groupName"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="e.g., Business Information"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="groupOrder" className="form-label">Group Order</label>
                      <input
                        type="number"
                        className="form-control"
                        id="groupOrder"
                        value={groupOrder}
                        onChange={(e) => setGroupOrder(e.target.value)}
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
                      {loading ? "Adding..." : "Add Group"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Group Modal */}
        {showEditModal && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Field Group</h5>
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
                      <label htmlFor="editGroupName" className="form-label">Group Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editGroupName"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="e.g., Business Information"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editGroupOrder" className="form-label">Group Order</label>
                      <input
                        type="number"
                        className="form-control"
                        id="editGroupOrder"
                        value={groupOrder}
                        onChange={(e) => setGroupOrder(e.target.value)}
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
                      {loading ? "Updating..." : "Update Group"}
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

export default MainFieldGroups;
