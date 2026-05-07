import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('gis_current_user');
    const savedUsers = localStorage.getItem('gis_users');
    
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedUsers) setUsers(JSON.parse(savedUsers));
  }, []);

  const login = (email, password) => {
    const existingUser = users.find(u => u.email === email);
    let user;
    
    if (existingUser) {
      user = existingUser;
    } else {
      user = { email, name: email.split('@')[0], organization: 'Surveyor' };
    }
    
    setCurrentUser(user);
    localStorage.setItem('gis_current_user', JSON.stringify(user));
    return user;
  };

  const register = (userData) => {
    const newUser = {
      ...userData,
      registered: new Date().toISOString()
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('gis_users', JSON.stringify(updatedUsers));
    
    setCurrentUser(newUser);
    localStorage.setItem('gis_current_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('gis_current_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};