import React from 'react'
import UserTopBar from "../../includes/UserTopBar";

function Occupancy() {
  return (
    <>
      <UserTopBar>
        <div className="bg-light p-3 border-bottom text-center mb-4">
            <h4 className="mb-1">Occupancy</h4>
            <small className="text-muted">Application</small>
          </div>
      </UserTopBar>
    </>
  )
}

export default Occupancy