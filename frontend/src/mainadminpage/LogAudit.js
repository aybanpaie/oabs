import React, { useState } from "react";
import MainSideBar from "../includes/MainSideBar";
import { Plus, Trash, Pencil } from "lucide-react";

function LogAudit() {

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
                <h4 className="mb-0">Login Audit</h4>
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

            <hr />

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
                    <th>Log Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Paiz</td>
                    <td>Main Admin</td>
                    <td>All</td>
                    <td>Success</td>
                    <td>00-00-0000</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Simpz</td>
                    <td>Sub Admin</td>
                    <td>Barangay Clearance</td>
                    <td>Failed</td>
                    <td>00-00-0000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </MainSideBar>
    </>
  )
}

export default LogAudit