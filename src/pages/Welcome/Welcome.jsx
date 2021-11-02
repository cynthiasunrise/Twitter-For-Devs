import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../../components/Footer';
import { UserContext } from '../../contexts/UserContext';
import { firestore } from '../../firebase/firebase';
import ColorPicker from './ColorPicker';
import './Welcome.css';

const KEYS = {
  color: 'color',
  username: 'username',
};

function Welcome() {
  const [preference, setPreference] = useState({
    id: '',
    username: '',
    color: '',
  });
  const [save, setSave] = useState(false);
  const { user } = useContext(UserContext);
  const history = useHistory();

  /*
  *   1. Entra usuario x 1era vez y graba en la BBDD y en el Local Storage
      2. Si vuelve a entrar de nuevo, busca en el Local Storage primero, si no hay consulta en la BBDD. Si hay algún valor en cualquiera de los dos, jala de ahí y completa los campos. Si no hay ningún valor, muestra los campos vacíos
  */

  useEffect(() => {
    firestore.collection('user_preferences').onSnapshot((snapshot) => {
      const user_preference = snapshot.docs.map((doc) => {
        return {
          username: doc.data().username,
          color: doc.data().color,
          id: doc.id,
        };
      });
      setPreference(user_preference[0]);
    });
  }, []);

  useEffect(() => {
    if (save) {
      // Guardar en Local  Storage
      localStorage.setItem(KEYS.color, preference.color);
      localStorage.setItem(KEYS.username, preference.username);

      // Guardar en Firestore
      firestore.doc(`user_preferences/${preference.id}`).update({
        username: preference.username,
        color: preference.color,
        uid: user.uid,
        email: user.email,
      });

      history.push('/');
    }
  }, [save, preference.username, preference.color, preference.id]);

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
          <button onClick={handleSubmit} className="btn welcome__btn">
            continue
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Welcome;
