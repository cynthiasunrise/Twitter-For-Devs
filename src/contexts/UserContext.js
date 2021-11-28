import { createContext, useEffect, useState } from 'react';
import { auth, firestore } from '../firebase/firebase';

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        firestore.collection('user_photos').doc(user.uid).set({
          id: user.uid,
          photoURL: user.photoURL,
        });
      }
      setLoading(false);
      // console.log('user Changed!', user);
    });
    return () => unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {!loading && children}
    </UserContext.Provider>
  );
}
