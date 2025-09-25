import React, { useState } from "react";
import MainSideBar from "../includes/MainSideBar";
import { Plus, Trash, Pencil, Download } from "lucide-react";

function Docoment() {
  const [searchName, setSearchName] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Barangay Clearance", "Occupancy Permit"];

  return (
    <>
      <MainSideBar>
        <div className="container-fluid p-4">
          <div className="bg-light p-4 border-bottom text-center mb-4 shadow-sm">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">Documents</h4>
              <div>
                <button className="btn btn-outline-secondary me-2">
                  <Plus /> Add Document
                </button>
              </div>
            </div>
            <hr className="my-0"/>
            <div className="bg-light p-4 border-bottom text-center mb-4 shadow-sm">
              {/* Search and Filter Row */}
              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="form-label text-muted">
                    Search by document name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by document name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label text-muted">
                    Search by meta tags
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by meta tags"
                    value={searchTags}
                    onChange={(e) => setSearchTags(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label text-muted">
                    Select Category
                  </label>
                  <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Category Name</th>
                      <th>Document Name</th>
                      <th>Description</th>
                      <th>Date Added</th>
                      <th>Created By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Barangay Clearance</td>
                      <td>brgyclearancecert</td>
                      <td>sirtipikision</td>
                      <td>00-00-0000</td>
                      <td>Paiz</td>
                      <td>
                        <button className="btn btn-sm">
                          <Download />
                        </button>
                        <button className="btn btn-sm">
                          <Pencil className="text-primary" />
                        </button>
                        <button className="btn btn-sm">
                          <Trash className="text-danger" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Occupancy Permit</td>
                      <td>occupancypermitcert</td>
                      <td>sirtipiket</td>
                      <td>00-00-0000</td>
                      <td>Simpz</td>
                      <td>
                        <button className="btn btn-sm">
                          <Download />
                        </button>
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
      </MainSideBar>
    </>
  );
}

export default Docoment;
