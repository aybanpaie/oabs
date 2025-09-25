import React, { useState } from "react";
import MainSideBar from "../includes/MainSideBar";
import { Plus, Trash, Pencil } from "lucide-react";

function Roles() {
  const [searchName, setSearchName] = useState("");
  
  return (
    <>
      <MainSideBar>
        <div className="container-fluid p-4">
          {/* Header */}

          <div className="bg-light p-4 border-bottom text-center mb-4 shadow-sm">
            {/* Search and Filter Row */}
            <div className="row mb-4">
              <div className="col-md-4 d-flex">
                <button className="btn btn-outline-secondary me-2 mx-1">
                  <Plus /> Add Role
                </button>
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Search..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
            </div>

            <hr/>

            {/* Table */}
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Username</th>
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
                  <tr>
                    <td>2</td>
                    <td>Simpz</td>
                  <td>Sub-Admin</td>
                  <td>Barangay Clearance</td>
                  <td>Inactive</td>
                  <td>00-00-0000</td>
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

export default Roles;
