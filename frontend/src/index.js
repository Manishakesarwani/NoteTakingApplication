import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NotesContextProvider } from './context/NotesContext';
import { UserEmailContextProvider } from './context/UserEmailContext';
import { UserAuthenticateContextProvider } from './context/UserAuthenticateContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserAuthenticateContextProvider>
    <UserEmailContextProvider>
    <NotesContextProvider>
    <App />
    </NotesContextProvider>
    </UserEmailContextProvider>
    </UserAuthenticateContextProvider>
  </React.StrictMode>
);
