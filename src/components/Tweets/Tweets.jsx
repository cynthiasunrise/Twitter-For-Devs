import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import Tweet from './Tweet';
import './Tweets.css';

function Tweets({ tweets }) {
  const { pathname } = useLocation();

  const getNavigationOptions = () => {
    if (pathname === '/posts' || pathname === '/favorites') {
      return (
        <div className="tweets__navigationOptions">
          <div className="container">
            <NavLink
              className="tweets__navigationOption"
              activeClassName="tweets__navigationOption_active"
              to="/"
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
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </section>
  );
}

export default Tweets;
