import Footer from '../../components/Footer';
import ColorPicker from './ColorPicker';
import './Welcome.css';

function Welcome() {
  const handleContinue = () => {};

  return (
    <div className="welcome">
      <div className="welcome__logo-container">
        <img src="/images/logo_big.svg" alt="Devs United Logo" />
      </div>
      <div className="welcome__content-container">
        <div className="welcome__content-body">
          <h2 className="title-text">
            Welcome <span className="red-text">name!</span>
          </h2>
          <input
            type="text"
            className="welcome-input"
            placeholder="Type your username"
          />
          <p>Select your favorite color</p>
          <ColorPicker />
          <button onClick={handleContinue} className="welcome__btn">
            continue
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Welcome;
