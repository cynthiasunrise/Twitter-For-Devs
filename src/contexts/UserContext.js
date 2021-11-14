import { createContext, useEffect, useState } from 'react';
import { auth, firestore } from '../firebase/firebase';

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState();

  // const saveUserPhotoURL = () => {};

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        firestore.collection('user_photos').doc(user.uid).set({
          id: user.uid,
          photoURL: user.photoURL,
        });
      }
      console.log('user Changed!', user);
    });
    return () => unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
