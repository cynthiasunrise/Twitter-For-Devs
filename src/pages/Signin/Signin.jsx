import Footer from '../../components/Footer';
import './Signin.css';

function Signin() {
  return (
    <div className="signin">
      <div className="signin__logo-container">
        <img src="/images/logo_big.svg" alt="Devs United Logo" />
      </div>
      <div className="signin__content-container">
        <div className="signin__content-body">
          <h1 className="title-text signin__title">Devs united twitter</h1>
          <p>Un lugar para crear conexión entre DEVS</p>
          <img src="/images/google_signin.svg" alt="Google Sign In" />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Signin;
