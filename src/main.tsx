import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryProvider } from './lib/react-query/QueryProvider';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

ReactDom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryProvider>
    </Router>
  </React.StrictMode>
);
