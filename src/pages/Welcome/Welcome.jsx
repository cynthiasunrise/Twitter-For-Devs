import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../../components/Layout/Footer';
import { Loading } from '../../components/Loading';
import { firestore } from '../../firebase/firebase';
import useUserPreference from '../../hooks/useUserPreference';
import ColorPicker from './ColorPicker';
import './Welcome.css';

function Welcome() {
  const [save, setSave] = useState(false);
  const { user, preference, setPreference, loadingPreference } =
    useUserPreference();
  const [error, setError] = useState({
    estado: false,
    mensaje: '',
  });

  const history = useHistory();

  useEffect(() => {
    if (save) {
      if (!!preference.uid)
        firestore.doc(`user_preferences/${preference.id}`).update({
          username: preference.username,
          color: preference.color,
        });
      else
        firestore.collection('user_preferences').add({
          username: preference.username,
          color: preference.color,
          uid: user.uid,
        });

      history.push('/');
    }
  }, [
    save,
    preference.color,
    preference.username,
    preference.id,
    preference.uid,
    user.uid,
    history,
  ]);

  const handleColorChange = (color) => {
    setPreference((p) => ({ ...p, color }));
  };

  const validate = () => {
    if (preference.username.length < 4) {
      setError({
        estado: true,
        mensaje: 'You have to enter a username with minimum 4 characthers',
      });
      return false;
    }
    if (!preference.color) {
      setError({
        estado: true,
        mensaje: 'You have to select a color',
      });
      return false;
    }
    setError({
      estado: false,
      mensaje: '',
    });
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSave(true);
    }
  };

  return (
    <div className="welcome">
      <div className="welcome__logo-container">
        <img src="/images/logo_big.svg" alt="Devs United Logo" />
      </div>
      <div className="welcome__content-container">
        <div className="welcome__content-body">
          {loadingPreference && (
            <Loading className="loading" fill="pink" stroke="" />
          )}
          {!loadingPreference && (
            <>
              <h2 className="title-text">
                Welcome <span className="red-text">name!</span>
              </h2>
              <input
                type="text"
                className="input-text welcome__input"
                placeholder="Type your username"
                value={preference.username}
                onChange={(e) =>
                  setPreference((p) => ({
                    ...p,
                    username: e.target.value,
                  }))
                }
              />
              <p>Select your favorite color</p>
              <div className="welcome__color-picker">
                <ColorPicker
                  value={preference.color}
                  onChange={handleColorChange}
                />
              </div>
              {error.estado && (
                <p style={{ marginBottom: 0 }} className="error">
                  {error.mensaje}
                </p>
              )}
              <button
                onClick={handleSubmit}
                className="btn btn-green welcome__btn"
              >
                continue
              </button>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Welcome;
