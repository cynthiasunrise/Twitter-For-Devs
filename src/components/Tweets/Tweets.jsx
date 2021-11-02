import { useHistory, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import './Tweets.css';

function Tweets() {
  const { pathname } = useLocation();
  const history = useHistory();

  const getNavigationOptions = () => {
    if (pathname === '/posts' || pathname === '/favorites') {
      return (
        <div className="tweets__navigationOptions">
          <div className="container">
            <NavLink
              className="tweets__navigationOption"
              activeClassName="tweets__navigationOption_active"
              to="/posts"
            >
              Posts
            </NavLink>
            <NavLink
              className="tweets__navigationOption"
              activeClassName="tweets__navigationOption_active"
              to="/favorites"
            >
              Favorites
            </NavLink>
          </div>
        </div>
      );
    }
  };

  return (
    <section className="tweets">
      {getNavigationOptions()}
      <div className="container">
        <div>TWEETS</div>;
      </div>
    </section>
  );
}

export default Tweets;
