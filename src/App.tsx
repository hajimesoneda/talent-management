import React from 'react';
import { Router } from './components/Router';
import { Header } from './components/Header';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <Header />
      </Router>
    </div>
  );
}