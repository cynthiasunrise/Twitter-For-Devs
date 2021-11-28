import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { firestore } from '../firebase/firebase';

const defaultPreference = {
  username: '',
  color: '',
};

const useUserPreference = () => {
  const { user } = useContext(UserContext);
  const [preference, setPreference] = useState(defaultPreference);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      firestore
        .collection('user_preferences')
        .where('uid', '==', user.uid)
        .limit(1)
        .get()
        .then((snapshot) => {
          if (snapshot.docs.length > 0) {
            const user_preference = {
              username: snapshot.docs[0].data().username,
              color: snapshot.docs[0].data().color,
              uid: snapshot.docs[0].data().uid,
              id: snapshot.docs[0].id,
            };
            setPreference(user_preference);
          } else {
            setPreference(defaultPreference);
          }
          setLoading(false);
        });
    }
  }, [user]);

  return { user, preference, setPreference, loadingPreference: loading };
};

export default useUserPreference;
