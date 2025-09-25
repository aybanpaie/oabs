import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mb-5 vw-100'>
      <header className='fixed-top'>
        <div className="bg-color-main py-2 d-none d-lg-block">
          <div className='container'>
            <div className="site-title ms-5">
              <h1>
                <a href="/" className="site-title-link">OABS</a>
              </h1>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg bg-color-secondary py-0">
          <div className="container">
            <ul className="navbar-nav me-auto ms-5">
              <li className="nav-item">
                <Link to="/" className="nav-link nav-link-custom">Home</Link>
              </li>
              <li className="nav-item ms-2">
                <Link to="/loginfinal/user" className="nav-link nav-link-custom">New Application</Link>
              </li>      
              {/* <li className="nav-item ms-2">
                <Link to="/requirements" className="nav-link nav-link-custom">Requirements</Link>
              </li> */}
              <li className="nav-item ms-2">  
                <Link to="/tracking" className="nav-link nav-link-custom">Permit Tracking</Link>
              </li>
              <li className="nav-item ms-2">
                <Link to="/contactus" className="nav-link nav-link-custom">Contact Us</Link>
              </li>
              <li className="nav-item ms-2">
                <Link to="/about" className="nav-link nav-link-custom">About</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;