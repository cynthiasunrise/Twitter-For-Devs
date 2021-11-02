import { useContext } from 'react';
import { useHistory } from 'react-router';
import Footer from '../../components/Footer';
import { UserContext } from '../../contexts/UserContext';
import { loginConGoogle } from '../../firebase/firebase';
import './Signin.css';

function Signin() {
  const history = useHistory();
  const { user } = useContext(UserContext);

  const handleSignin = async () => {
    try {
      !user && (await loginConGoogle());
      history.push('/welcome');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signin">
      <div className="signin__logo-container">
        <img src="/images/logo_big.svg" alt="Devs United Logo" />
      </div>
      <div className="signin__content-container">
        <div className="signin__content-body">
          <h1 className="title-text signin__title">Devs united twitter</h1>
          <p>Un lugar para crear conexión entre DEVS</p>
          <img
            alt="signin button"
            src="/images/google_signin.svg"
            onClick={handleSignin}
          />
        </div>
        <div className="signin__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Signin;
