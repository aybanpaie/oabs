import React, { useState } from "react";
import MainSideBar from "../includes/MainSideBar";
import { Plus, Trash, Pencil, Download } from "lucide-react";

function DocCategory() {
  return (
    <>
      <MainSideBar>
        <div className="container-fluid p-4">
          <div className="bg-light p-4 border-bottom text-center mb-4 shadow-sm">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">Document Category</h4>
              <div>
                <button className="btn btn-outline-secondary me-2">
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
                      <th>Name</th>
                      <th>Description</th>
                      <th>Date Added</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Barangay Clearance</td>
                      <td>sirtipikision</td>
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
                    <tr>
                      <td>2</td>
                      <td>Occupancy Permit</td>
                      <td>sirtipiket</td>
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
        </div>
      </MainSideBar>
    </>
  );
}

export default DocCategory;
