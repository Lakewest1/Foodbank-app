import { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import PropTypes from 'prop-types';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('Menu');
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // Toggle for responsive menu
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    setToken('');
    window.location.href = '/';
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchValue)}`);
      setSearchValue('');
      setSearchVisible(false);
    }
  };

  return (
    <div className="Navbar">
      <div className="navbar-header">
        <Link to="/">
          <img className="logo" src={assets.Grova2} alt="Logo" />
        </Link>
        <Link to="/">
          <h1 className="beat">Food-Bank</h1>
        </Link>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
        <Link
          to="/"
          onClick={() => {
            setMenu('Home');
            setMenuOpen(false);
          }}
          className={menu === 'Home' ? 'active' : ''}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => {
            setMenu('Menu');
            setMenuOpen(false);
          }}
          className={menu === 'Menu' ? 'active' : ''}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => {
            setMenu('Mobile-App');
            setMenuOpen(false);
          }}
          className={menu === 'Mobile-App' ? 'active' : ''}
        >
          Mobile
        </a>
        <a
          href="#Footer"
          onClick={() => {
            setMenu('Contact');
            setMenuOpen(false);
          }}
          className={menu === 'Contact' ? 'active' : ''}
        >
          Contact
        </a>
      </ul>

      <div className="navbar-right">
        <div className="search-container">
          <img
            className="search"
            src={assets.search_icon}
            alt="Search Icon"
            onClick={() => setSearchVisible((prev) => !prev)}
          />
          {searchVisible && (
            <form className="search-form" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search food..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-submit">
                Go
              </button>
            </form>
          )}
        </div>

        <div className="navbar-basket">
          <Link to={'/cart'}>
            <img src={assets.basket_icon} alt="Basket Icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? '<></>' : 'dot'}></div>
        </div>

        {!token ? (
          <button className="btn" onClick={() => setShowLogin(true)}>
            Sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile Icon" />
            <ul className="nav-profile-drop-down">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Bag Icon" />
                Orders
              </li>
              <hr />
              <li onClick={logOut}>
                <img src={assets.logout_icon} alt="Logout Icon" />
                LogOut
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default Navbar;
