import { useHistory } from 'react-router';
import Footer from '../../components/Footer';
import './Signin.css';

function Signin() {
  const history = useHistory();

  const handleSignin = () => {
    history.push('/welcome');
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
          <button className="signin__button" onClick={handleSignin}></button>
        </div>
        <div className="signin__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Signin;
