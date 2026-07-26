import { createContext, useContext, useEffect, useState } from 'react';

import {
  loginUser,
  getCurrentUser,
  logoutUser
} from '../api/authApi';


const AuthContext = createContext();



export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const restoreSession = async () => {

      const token = localStorage.getItem('douanenav.token');


      if (!token) {

        setLoading(false);
        return;

      }


      try {

        const currentUser = await getCurrentUser(token);

        setUser(currentUser);

      } catch {

        localStorage.removeItem('douanenav.token');

      }


      setLoading(false);

    };


    restoreSession();

  }, []);




  const login = async (email, password) => {

    const data = await loginUser(email, password);


    localStorage.setItem(
      'douanenav.token',
      data.token
    );


    setUser(data.user);


    return data;

  };




  const logout = async () => {

    const token = localStorage.getItem(
      'douanenav.token'
    );


    if (token) {

      await logoutUser(token);

    }


    localStorage.removeItem(
      'douanenav.token'
    );


    setUser(null);

  };



  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};



export const useAuth = () => useContext(AuthContext);