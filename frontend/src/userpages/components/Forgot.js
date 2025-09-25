import { useState } from 'react';
import { Link } from "react-router-dom";

export default function KoronadalForgot() {
  const [formData, setFormData] = useState({
    email: ''
  });
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleForgotAccount = (e) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    console.log('Registration cancelled');
    alert('Forgot cancelled. Returning to login page.');
  };

  return (
    <>
      <div className="min-vh-100 position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25"></div>
        <div className="position-relative d-flex align-items-center justify-content-center min-vh-100 px-4 login-container">
          <div className="card shadow-lg login-card">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle border border-4 login-logo"></div>
                <h4 className="fw-semibold text-dark mb-1">Forgot Password</h4>
                <p className="text-muted mb-4" style={{ fontSize: '14px' }}>Online Business Permit & Licensing System</p>
              </div>
              <div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="d-flex gap-3">
                  <Link
                    to="/loginfinal/user"
                    className="btn border flex-fill"
                    style={{ 
                      color: '#dc3545', 
                      borderColor: '#dc3545'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#dc3545';
                      e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#dc3545';
                    }}
                  >
                    CANCEL
                  </Link>
                  <button
                    type="submit"
                    className="btn text-white flex-fill"
                    style={{ backgroundColor: '#dc3545' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#bb2d3b'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                  >
                    SEND RECOVERY LINK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}