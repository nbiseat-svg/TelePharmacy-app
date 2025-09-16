import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../reducers/authReducer';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation();

  // Close sidebar when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && !event.target.closest('.main-nav') && !event.target.closest('.menu-toggle')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarOpen]);

  const logoutHandler = () => {
    dispatch(userLogout());
    navigate('/login');
  };

  // Handle keyboard navigation for mobile menu
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <motion.header 
        className="app-header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="header-container">
          <div className="header-left">
            <button 
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={sidebarOpen}
              onKeyDown={handleKeyDown}
            >
              {sidebarOpen ? '✕' : '☰'}
            </button>
            <Link to="/" className="logo" tabIndex={0}>
              <span>TelePharmacy</span>
            </Link>
          </div>

          <nav className={`main-nav ${sidebarOpen ? 'mobile-menu open' : 'mobile-menu'}`} role="navigation">
            <ul>
              <li><Link to="/" onClick={() => setSidebarOpen(false)} tabIndex={sidebarOpen ? 0 : -1}>{t('home')}</Link></li>
              <li><Link to="/medications" onClick={() => setSidebarOpen(false)} tabIndex={sidebarOpen ? 0 : -1}>{t('medications')}</Link></li>
              <li><Link to="/pharmacy-finder" onClick={() => setSidebarOpen(false)} tabIndex={sidebarOpen ? 0 : -1}>{t('pharmacyFinder')}</Link></li>
              <li><Link to="/consultation/book" onClick={() => setSidebarOpen(false)} tabIndex={sidebarOpen ? 0 : -1}>{t('consultations')}</Link></li>
            </ul>
          </nav>

          <div className="header-right">
            <select 
              className="language-toggle" 
              onChange={(e) => i18n.changeLanguage(e.target.value)} 
              value={i18n.language}
              aria-label={t('changeLanguage')}
            >
              <option value="en">{t('english')}</option>
              <option value="am">{t('amharic')}</option>
              <option value="ti">{t('tigrigna')}</option>
              <option value="om">{t('oromo')}</option>
            </select>
            
            {userInfo ? (
              <div className="user-menu">
                <div className="user-dropdown">
                  <button className="user-button" aria-haspopup="true" aria-expanded="false">
                    {userInfo.name}
                  </button>
                  <div className="dropdown-content" role="menu">
                    <Link to="/profile" role="menuitem">{t('profile')}</Link>
                    <Link to="/orders" role="menuitem">{t('orders')}</Link>
                    <Link to="/prescriptions" role="menuitem">{t('prescriptions')}</Link>
                    <button onClick={logoutHandler} role="menuitem">{t('logout')}</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login">{t('login')}</Link>
                <Link to="/register">{t('register')}</Link>
              </div>
            )}
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;