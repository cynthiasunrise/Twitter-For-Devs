import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import UserContextProvider from './contexts/UserContext';
import MyFavorites from './pages/MyFavorites/MyFavorites';
import MyFeed from './pages/MyFeed/MyFeed';
import MyPosts from './pages/MyPosts/MyPosts';
import NotFound from './pages/NotFound/NotFound';
import Signin from './pages/Signin/Signin';
import UserProfile from './pages/UserProfile/UserProfile';
import Welcome from './pages/Welcome/Welcome';

function App() {
  return (
    <UserContextProvider>
      <div>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={MyFeed} />
            <Route exact path="/signin" component={Signin} />
            <PrivateRoute exact path="/welcome" component={Welcome} />
            <PrivateRoute exact path="/posts" component={MyPosts} />
            <PrivateRoute exact path="/favorites" component={MyFavorites} />
            <PrivateRoute
              exact
              path="/profile/:profileId"
              component={UserProfile}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    </UserContextProvider>
  );
}

export default App;
