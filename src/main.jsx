import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Fase 1: guardado en el navegador (localStorage).
// Fase 2: migrar a Supabase para sincronizar entre el equipo y las distribuidoras.
window.storage = {
  get: async (k) => { const v = localStorage.getItem(k); if (v === null) throw new Error('not found'); return { key: k, value: v } },
  set: async (k, v) => { localStorage.setItem(k, v); return { key: k, value: v } },
  delete: async (k) => { localStorage.removeItem(k); return { key: k, deleted: true } },
  list: async (p) => { const keys = []; for (let i = 0; i < localStorage.length; i++) { const kk = localStorage.key(i); if (!p || kk.startsWith(p)) keys.push(kk) } return { keys } },
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
