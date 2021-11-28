import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(UserContext);

  return (
    <Route {...rest}>{user ? <Component /> : <Redirect to="/signin" />}</Route>
  );
}

export default PrivateRoute;
