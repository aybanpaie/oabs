import { useState } from "react";
import { Link } from "react-router-dom";

function UserLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", { username, password });
  };
  return (
    <>
      <div className="min-vh-100 position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25"></div>
        <div className="position-relative d-flex align-items-center justify-content-center min-vh-100 px-4 login-container">
          <div className="card shadow-lg login-card">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle border border-4 login-logo">
                  <div className="logo-circle w-100 h-100">
                    <div className="logo-inner w-50 h-50"></div>
                  </div>
                </div>
                <h4 className="fw-semibold text-dark mb-1">
                  Online Business Permit &
                </h4>
                <h4 className="fw-semibold text-dark mb-4">Licensing System</h4>
              </div>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username or Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="showPassword"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="showPassword">
                    Show Password
                  </label>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <Link
                    to="/create/user"
                    className="text-decoration-none"
                    style={{ color: "#dc3545" }}
                  >
                    Create a new account
                  </Link>
                  <Link
                    to="/forgot/user"
                    className="text-decoration-none"
                    style={{ color: "#dc3545" }}
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Link
                  to="/dasboard"
                  className="btn w-100 text-white fw-medium"
                  style={{ backgroundColor: "#dc3545" }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#bb2d3b")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#dc3545")
                  }
                >
                  LOGIN
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserLogin;
