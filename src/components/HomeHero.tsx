// src/components/HomeHero.tsx
import React from 'react'

export const HomeHero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-6 text-center w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Mesurez & agissez sur la QVCT, simplement.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Une IA émotionnelle, un dashboard RH clair et des actions concrètes (box)
          pour replacer l’humain au cœur de la performance.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/contact"
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            Demander une démo
          </a>
          <a
            href="/saas"
            className="border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/5 transition"
          >
            Voir les fonctionnalités
          </a>
        </div>
        <div className="mt-10 flex justify-center gap-6 text-sm text-gray-500">
          <span>🇫🇷 Made in France</span>•<span>RGPD & Anonyme</span>•<span>Export DUERP</span>
        </div>
      </div>
    </section>
  )
}
