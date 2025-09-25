import React from 'react'
import UserTopBar from "../../includes/UserTopBar";

function Foundation() {
  return (
    <>
      <UserTopBar>
        <div className="bg-light p-3 border-bottom text-center mb-4">
            <h4 className="mb-1">Foundation</h4>
            <small className="text-muted">Application</small>
          </div>
      </UserTopBar>
    </>
  )
}

export default Foundation