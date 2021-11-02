import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
