import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTopBar from "../../includes/UserTopBar";

function BrgyClearance() {
  useEffect(() => {
    // Generate tracking code on component mount
    const generateTrackingCode = () => {
      const code = Array.from({ length: 5 }, () =>
        Math.random().toString(36).substr(2, 4).toUpperCase()
      ).join("-");
      setFormData((prev) => ({ ...prev, trackingcode: code }));
    };

    generateTrackingCode();
  }, []);

  const [formData, setFormData] = useState({
    trackingcode: "",
    fullname: "",
    emailaddress: "",
    contactnumber: "",
    province: "",
    city: "",
    barangay: "",
    purpose: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://oabs-f7by.onrender.com/create",
        formData
      );
      alert(response.data.message || "Record created successfully!");

      // Generate new tracking code and reset form
      const newTrackingCode = generateTrackingCode();
      setFormData({
        trackingcode: newTrackingCode,
        fullname: "",
        emailaddress: "",
        contactnumber: "",
        province: "",
        city: "",
        barangay: "",
        purpose: "",
      });
    } catch (err) {
      alert(
        "Error creating record: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <>
      <UserTopBar>
        <div className="mb-4 mx-5 d-flex flex-column justify-content-center align-items-center">
          <div className="row w-100">
            <div className="bg-light p-3 border-bottom text-center mb-4 shadow-sm">
              <h4 className="mb-1">Barangay Clearance</h4>
              <small className="text-muted">Application</small>
            </div>
          </div>
          <div className="row w-50">
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="bg-danger text-white p-3 mb-0 rounded-top d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Application Form</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <label className="form-label text-muted">
                          TRACKING CODE
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="0000-0000-0000-0000-0000"
                          name="trackingcode"
                          onChange={handleChange}
                          value={formData.trackingcode}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <label className="form-label text-muted">
                          FULL NAME
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter Your Name"
                          name="fullname"
                          onChange={handleChange}
                          value={formData.fullname}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label text-muted">
                          EMAIL ADDRESS
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter Email Address"
                          name="emailaddress"
                          onChange={handleChange}
                          value={formData.emailaddress}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-muted">
                          CONTACT NUMBER
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter Contact Number"
                          name="contactnumber"
                          onChange={handleChange}
                          value={formData.contactnumber}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label className="form-label text-muted">
                          PROVINCE
                        </label>
                        <select
                          className="form-select form-select-lg"
                          onChange={handleChange}
                          value={formData.province}
                          name="province"
                        >
                          <option value="">Choose...</option>
                          <option value="South Cotabato">South Cotabato</option>
                          <option value="Test Province">Test Province</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label text-muted">CITY</label>
                        <select
                          className="form-select form-select-lg"
                          onChange={handleChange}
                          value={formData.city}
                          name="city"
                        >
                          <option value="">Choose...</option>
                          <option value="Koronadal">Koronadal</option>
                          <option value="Test City">Test City</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label text-muted">
                          BARANGAY
                        </label>
                        <select
                          className="form-select form-select-lg"
                          onChange={handleChange}
                          value={formData.barangay}
                          name="barangay"
                        >
                          <option value="">Choose...</option>
                          <option value="Magsaysay">Magsaysay</option>
                          <option value="Test Barangay">Test Barangay</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <label className="form-label text-muted">PURPOSE</label>
                        <textarea
                          type="text"
                          className="form-control form-control-lg textarea-size"
                          placeholder="Enter Purpose"
                          name="purpose"
                          onChange={handleChange}
                          value={formData.purpose}
                        />
                      </div>
                    </div>
                    <div className="gap-3 mt-4 text-end">
                      <div className="col-md-12">
                        <Link
                          to="/business/new-application/checklist"
                          className="btn btn-danger px-4 mx-1"
                        >
                          CANCEL
                        </Link>
                        <button
                          type="submit"
                          className="btn btn-success px-4 mx-1"
                        >
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserTopBar>
    </>
  );
}

export default BrgyClearance;
