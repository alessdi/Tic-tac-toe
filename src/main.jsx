import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Esto ya lo corregiste

// IMPORTANTE: Aquí, 'App' es la variable que almacena lo exportado de './App.jsx'
import App from './App.jsx';

// Aquí se renderiza el componente importado, que ahora se llama App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> 
  </StrictMode>
);