// src/components/Navigation.tsx
import React from 'react'
import { Link } from 'react-router-dom'

export const Navigation: React.FC = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-white border-b border-gray-100">
      <Link to="/" className="flex items-center gap-2 font-bold text-primary text-lg">
        <img src="/logo.svg" alt="QVT Box" className="h-8" />
        QVT Box
      </Link>

      <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/saas">Fonctionnalités</Link></li>
        <li><Link to="/tarifs">Tarifs</Link></li>
        <li><Link to="/ressources">Ressources</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <Link
        to="/contact"
        className="hidden md:inline-block bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition"
      >
        Demander une démo
      </Link>
    </nav>
  )
}
