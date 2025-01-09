import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div style={{textAlign: 'left'}}>
      {/* Main Footer Section */}
      <footer style={{background: '#212529'}} className=" text-white pt-4">
        <div className="container">
          <div className="row">
            {/* Left Side: Company Info */}
            <div className="col-md-4">
              <h5>securearbitrage.com</h5>
              <hr style={{width: '50%'}}/>
              <img style={{width: '60px', height: '60px', borderRadius: '8px', marginBottom: '20px'}} src="/logo.jpg"/>
              {/* <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vitae ipsum quis ligula luctus viverra.
              </p> */}
            </div>

            {/* Middle: Quick Links */}
            <div className="col-md-4">
              <h5>QUICK LINKS</h5>
              <hr style={{width: '50%'}}/>
              <ul className="list-unstyled">
                <li>
                  <NavLink to="/" className="text-white text-decoration-none">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about-us" className="text-white text-decoration-none">
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/pricing" className="text-white text-decoration-none">
                    Pricing
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/how-it-works" className="text-white text-decoration-none">
                    How It Works
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/faqs" className="text-white text-decoration-none">
                    Faqs
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Right Side: Contact Info */}
            <div className="col-md-4">
              <h5>CONTACT INFO</h5>
              <hr style={{width: '50%'}}/>
              <p>Email: support@securearbitrage.com</p>
            </div>
          </div>
        </div>
<hr/>
        {/* Bottom Section */}
        <div className="bg-dark text-center py-3">
          <p className="mb-0">&copy; {new Date().getFullYear()} securearbitrage.com. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
