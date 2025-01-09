import React, { useState } from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import { IoMenu } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../Assets/logo.jpg";
import Drawer from "../Home/Drawer";
import { useWallet } from "../Hooks/useConnectWallet";
import WalletModal from "./WalletModal";

const AppNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isOpen, setIsOpen] = useState(false);
  const [iswalletOpen, setIswalletOpen] = useState(false)
  const { walletAddress, user, ethBalance, ethBalanceUsdt, connectWallet } = useWallet();

  const handleMenuToggle = () => {
    setIsDrawerOpen(true);
  };

  const getLinkStyle = (path) => {
    if (location.pathname === path) {
      return { color: "#f0a500", fontWeight: "bold" }; 
    }
    return { color: "#fff" };
  };

  const onClose = () => {
    setIsDrawerOpen(false); // Only close the drawer
  };

  console.log('WalletList', iswalletOpen);
  return (
    <Navbar
      style={{ height: "80px" }}
      bg="dark"
      variant="dark"
      expand="lg"
      className="px-3"
    >
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={logo}
            alt="Logo"
            className="d-inline-block align-top"
            style={{ borderRadius: "8px", height: "50px", width: "50px" }}
          />
        </Navbar.Brand>

        <Offcanvas.Body className="d-none d-lg-block">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link
              onClick={() => navigate("/about-us")}
              style={getLinkStyle("/about-us")}
            >
              About Us
            </Nav.Link>

            <Nav.Link
              onClick={() => navigate("/pricing")}
              style={getLinkStyle("/pricing")}
            >
              Pricing
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/how-it-works")}
              style={getLinkStyle("/how-it-works")}
            >
              How It Works
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/faqs")}
              style={getLinkStyle("/faqs")}
            >
              Faqs
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/past-opportunities")}
              style={getLinkStyle("/past-opportunities")}
            >
              Past Opportunities
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/token-bot")}
              style={getLinkStyle("/token-bot")}
            >
              Token Bot
            </Nav.Link>

            <Nav.Link
              onClick={() => navigate("/opportunity-bot")}
              style={getLinkStyle("/opportunity-bot")}
            >
              Opportunity Bot
            </Nav.Link>
           <WalletModal iswalletOpen={iswalletOpen} setIswalletOpen={setIswalletOpen} />

            {!user?.walletAddress? <button
            className="btn"
            style={{
              background: 'linear-gradient(45deg, #5B86E5, #36D1DC)', // Stylish gradient for the button
              color: '#FFFFFF',
              padding: '8px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: '0.3s ease',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0px 6px 15px rgba(0, 0, 0, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.3)';
            }}
            // onClick={connectWallet}
            onClick={() => setIswalletOpen(true)}
          >
            Connect to Wallet
          </button>
          :
         
          <Nav.Link
            onClick={() => navigate("/dashboard")}
            style={{
              background: 'linear-gradient(45deg, #5B86E5, #36D1DC)', 
              color: '#FFFFFF',
              padding: '8px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: '0.3s ease',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {user?.walletAddress ? `${user?.walletAddress.slice(0, 5)}...` : "No Wallet Address"}
          </Nav.Link>
          }
          </Nav>
        </Offcanvas.Body>

        {/* Right Side: Menu Icon for Small Devices */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-0"
          onClick={handleMenuToggle}
        >
          <IoMenu size={30} color="white" />
        </Navbar.Toggle>
      </Container>

      {/* Drawer Component */}
      <div className="text-left">
        <Drawer 
        isOpen={isDrawerOpen} 
        setIswalletOpen = {setIswalletOpen}
        iswalletOpen = {iswalletOpen}
        // onClose={() => setIsDrawerOpen(false)} 
        onClose={onClose}
        />
      </div>
    </Navbar>
  );
};

export default AppNavbar;
