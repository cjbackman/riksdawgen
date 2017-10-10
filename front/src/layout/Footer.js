import React from 'react';
import { NavLink } from 'react-router-dom';
import FaGithub from 'react-icons/lib/fa/github';
import FaFacebookSquare from 'react-icons/lib/fa/facebook-square';
import FaTwitter from 'react-icons/lib/fa/twitter';

export const Footer = () => (
  <div className="content-wrapper">
    <div className="whole" style={{ minHeight: 0 }}>
      <div className="footer">
        <div className="footer-left">
          <NavLink to="/about" className="footer-link">
          Om Riksdawgen
          </NavLink >
          <NavLink to="/contact" className="footer-link">
          Kontakta oss
        </NavLink>
        </div>
        <div className="footer-center">
          <FaGithub className="footer-icon" />
          <FaTwitter className="footer-icon" />
          <FaFacebookSquare className="footer-icon" />
        </div>
        <div className="footer-right">
          &#x24B8;
          Kultur1337en
        </div>
      </div>
    </div>
  </div>
);