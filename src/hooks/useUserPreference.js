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

  // console.log('USERPREFERENCE Hook');

  useEffect(() => {
    // console.log('USERPREFERENCE Hook USEEFFECTTTT!!!!!!');

    if (user) {
      // console.log('USERPREFERENCE Hook USEEFFECTTTT USER!!!!!');
      firestore
        .collection('user_preferences')
        .where('uid', '==', user.uid)
        .get()
        .then((snapshot) => {
          const user_preference = snapshot.docs.map((doc) => {
            return {
              username: doc.data().username,
              color: doc.data().color,
              uid: doc.data().uid,
              id: doc.id,
            };
          });
          user_preference.length
            ? setPreference(user_preference[0])
            : setPreference(defaultPreference);
        });
    }
  }, [user]);

  return { user, preference, setPreference };
};

export default useUserPreference;
