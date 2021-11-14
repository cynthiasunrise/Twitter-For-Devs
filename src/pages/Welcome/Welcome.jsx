import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../../components/Footer';
import { firestore } from '../../firebase/firebase';
import useUserPreference from '../../hooks/useUserPreference';
import ColorPicker from './ColorPicker';
import './Welcome.css';

const KEYS = {
  color: 'color',
  username: 'username',
};

function Welcome() {
  const { user, preference, setPreference } = useUserPreference();
  const [save, setSave] = useState(false);
  const history = useHistory();

  console.log('Welcome page', 'user', user);
  console.log('preference', preference);

  /*
  *   1. Entra usuario x 1era vez y graba en la BBDD y en el Local Storage
      2. Si vuelve a entrar de nuevo, busca en el Local Storage primero, si no hay consulta en la BBDD. Si hay algún valor en cualquiera de los dos, jala de ahí y completa los campos. Si no hay ningún valor, muestra los campos vacíos
  */

  useEffect(() => {
    if (save && preference.color && preference.username) {
      console.log('**********USE EFFECT!!!! luego del SAVE*************');
      // Guardar en Local  Storage
      localStorage.setItem(KEYS.color, preference.color);
      localStorage.setItem(KEYS.username, preference.username);

      // Guardar en Firestore
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
  }, [save]);

  const handleColorChange = (color) => {
    setPreference((p) => ({ ...p, color }));
  };

  const handleSubmit = () => {
    setSave(true);
  };

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
          <button onClick={handleSubmit} className="btn btn-green welcome__btn">
            continue
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Welcome;
