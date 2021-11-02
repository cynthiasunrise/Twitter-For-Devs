import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
            <Route exact path="/" component={MyFeed} />
            <Route path="/signin" component={Signin} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/posts" component={MyPosts} />
            <Route path="/favorites" component={MyFavorites} />
            <Route path="/profile/:profileId" component={UserProfile} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    </UserContextProvider>
  );
}

export default App;
