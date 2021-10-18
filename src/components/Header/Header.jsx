import { useLocation } from 'react-router';
import './Header.css';

function Header() {
  const { pathname } = useLocation();

  const getLeft = () => {
    if (pathname === '/') {
      return (
        <img
          className="ornacia header__img_profile"
          src="/images/ornacia.jpg"
          alt="My Profile Icon"
        />
      );
    }
    return (
      <>
        <img className="header__img_back" src="/images/back.svg" alt="back" />
        <span className="title_text">cynthia</span>
      </>
    );
  };

  const getRight = () => {
    if (pathname === '/') {
      return (
        <>
          <img
            className="header__img_logo"
            src="/images/logo_small.svg"
            alt="Devs United Logo"
          />
          <img
            className="header__img_devs_text"
            src="/images/devs_icon.svg"
            alt="Devs text"
          />
          <img
            className="header__img_united_text"
            src="/images/united_icon.svg"
            alt="United Text"
          />
        </>
      );
    }
    if (pathname === '/posts' || pathname === '/favorites') {
      return (
        <>
          <img
            className="header__img_logout"
            src="/images/logout.svg"
            alt="Logout"
          />
        </>
      );
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__left">{getLeft()}</div>
        <div className="header__right">{getRight()}</div>
      </div>
    </header>
  );
}

export default Header;
