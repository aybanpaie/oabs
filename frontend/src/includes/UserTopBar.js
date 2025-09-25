import React from 'react'
import { ArrowBigLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function UserTopBar({ children }) {
  return (
    <>
        <div className="d-flex flex-column w-100">
        <nav className="navbar navbar-dark bg-dark px-3 fixed-top">
          <div className="d-flex align-items-center w-100 justify-content-between">
            <div className="d-flex align-items-center">
              <Link
                to="/business/new-application/checklist"
                className="btn btn-outline-light me-3"
              >
                <ArrowBigLeft size={20} />
              </Link>
              <div className="d-flex align-items-center text-decoration-none">
                <div className="logo-circle me-3">
                  <div className="logo-inner"></div>
                </div>
                <h4 className="navbar-brand mb-0 text-white">Online BPLS</h4>
              </div>
            </div>
          </div>
        </nav>
        <main className="flex-grow-1 p-4 mt-5">
          <div className="container-fluid">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}

export default UserTopBar