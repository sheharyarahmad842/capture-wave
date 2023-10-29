import ReactDom from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './globals.css';

ReactDom.createRoot(document.getElementById('root')!).render(
  <Router>
    <App />
  </Router>
);
