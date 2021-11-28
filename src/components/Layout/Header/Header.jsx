import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { firestore, logout } from '../../../firebase/firebase';
import useUserPreference from '../../../hooks/useUserPreference';
import './Header.css';

function Header() {
  const { user, preference } = useUserPreference();
  const [username, setUsername] = useState('');
  const { pathname } = useLocation();
  const history = useHistory();
  const { profileId } = useParams();

  useEffect(() => {
    if (pathname.includes('/profile')) {
      const userPrefUnsubscribeCallback = firestore
        .collection('user_preferences')
        .where('uid', '==', profileId)
        .limit(1)
        .onSnapshot((userPrefSnapshot) => {
          setUsername(userPrefSnapshot.docs[0].data().username);
        });

      return () => userPrefUnsubscribeCallback();
    }
  }, [pathname, profileId]);

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/signin');
    } catch (error) {
      console.log(error);
    }
  };

  const getUserName = () => {
    if (pathname === '/posts' || pathname === '/favorites') {
      return preference.username;
    } else if (pathname.includes('/profile')) {
      return username;
    }
  };

  const getLeft = () => {
    if (pathname === '/') {
      return (
        <Link to="/posts">
          <img
            className="ornacia header__img_profile"
            src={user ? user.photoURL : '/images/ornacia.jpg'}
            alt="My Profile Icon"
          />
        </Link>
      );
    }
    return (
      <Link className="header__back" to="/">
        <img className="header__img_back" src="/images/back.svg" alt="back" />
        <span className="title_text">{getUserName()}</span>
      </Link>
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
          <Link to="/signin">
            <img
              className="header__img_logout"
              src="/images/logout.svg"
              alt="Logout"
              onClick={handleLogout}
            />
          </Link>
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
