import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

function MainRegister() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    retypePassword: "",
    email: "",
  });
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !formData.fullname ||
      !formData.username ||
      !formData.password ||
      !formData.email
    ) {
      setError("All fields are required!");
      return;
    }

    if (formData.password !== formData.retypePassword) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    if (!agreeToPolicy) {
      setError("Please agree to the Privacy Policy to continue.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://oabs-f7by.onrender.com/api/register",
        {
          fullname: formData.fullname,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }
      );

      if (response.data.success) {
        alert("Account created successfully! Please log in.");
        navigate("/oabps/user/login");
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="min-vh-100 position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25"></div>
        <div className="position-relative d-flex flex-column align-items-center justify-content-center min-vh-100 px-4 login-container">
          <h4 className="fw-semibold text-dark mb-1">MAIN ADMIN</h4>
          <div className="card shadow-lg login-card">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle border border-4 login-logo">
                  <div className="logo-circle w-100 h-100">
                    <div className="logo-inner w-50 h-50"></div>
                  </div>
                </div>
                <h4 className="fw-semibold text-dark mb-1">
                  Create a new Account
                </h4>
                <p className="text-muted mb-4" style={{ fontSize: "14px" }}>
                  Online Business Permit & Licensing System
                </p>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleCreateAccount}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="fullname"
                    placeholder="Fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="mb-3 position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    style={{ paddingRight: "40px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    style={{
                      border: "none",
                      background: "none",
                      padding: "0 10px",
                      color: "#6c757d",
                    }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="mb-3 position-relative">
                  <input
                    type={showRetypePassword ? "text" : "password"}
                    className="form-control"
                    name="retypePassword"
                    placeholder="Retype Password"
                    value={formData.retypePassword}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    style={{ paddingRight: "40px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                    onClick={() => setShowRetypePassword(!showRetypePassword)}
                    disabled={isLoading}
                    style={{
                      border: "none",
                      background: "none",
                      padding: "0 10px",
                      color: "#6c757d",
                    }}
                  >
                    {showRetypePassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreePolicy"
                    checked={agreeToPolicy}
                    onChange={(e) => setAgreeToPolicy(e.target.checked)}
                    disabled={isLoading}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="agreePolicy"
                    style={{ fontSize: "14px" }}
                  >
                    I agree and accept to the{" "}
                    <a
                      href="#"
                      className="text-decoration-none fw-bold"
                      style={{ color: "#dc3545" }}
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Privacy Policy would be displayed here.");
                      }}
                    >
                      PRIVACY POLICY
                    </a>
                  </label>
                </div>
                <div className="d-flex gap-3">
                  <Link
                    to="/oabps/main/login"
                    className="btn border flex-fill"
                    style={{
                      color: "#dc3545",
                      borderColor: "#dc3545",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#dc3545";
                      e.target.style.color = "white";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#dc3545";
                    }}
                  >
                    CANCEL
                  </Link>
                  <button
                    type="submit"
                    className="btn text-white flex-fill"
                    style={{ backgroundColor: "#dc3545" }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#bb2d3b")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#dc3545")
                    }
                    disabled={isLoading}
                  >
                    {isLoading ? "CREATING..." : "CREATE ACCOUNT"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainRegister