import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component="MyFeed" />
          <Route path="/signin" component="Signin" />
          <Route path="/welcome" component="Welcome" />
          <Route path="/posts" component="MyPosts" />
          <Route path="/favorites" component="MyFavorites" />
          <Route path="/profile/:profileId" component="UserProfile" />
          <Route path="*" component="NotFound" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
