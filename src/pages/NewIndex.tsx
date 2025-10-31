// src/pages/NewIndex.tsx
import React from 'react'
import { HomeHero } from '@/components/HomeHero'

export const NewIndex: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <HomeHero />

      {/* --- Section 1 : Constat --- */}
      <section className="py-16 px-6 text-center max-w-4xl">
        <h2 className="text-3xl font-semibold mb-4 text-primary">Le coût du désengagement</h2>
        <p className="text-lg text-gray-600 mb-8">
          Le désengagement coûte jusqu’à <strong>14 000 € par salarié/an</strong>.  
          QVT Box aide les entreprises à mesurer et agir avant la rupture.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p className="text-4xl font-bold text-primary">+9%</p>
            <p className="text-sm text-gray-600">Croissance du marché QVT/an</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">80%</p>
            <p className="text-sm text-gray-600">Des salariés ressentent du stress</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">3x</p>
            <p className="text-sm text-gray-600">Moins d’absentéisme avec prévention</p>
          </div>
        </div>
      </section>

      {/* --- Section 2 : La solution --- */}
      <section className="py-20 px-6 bg-gray-50 w-full text-center">
        <h2 className="text-3xl font-semibold text-primary mb-10">QVT Box, la solution phygitale</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-3">Écouter</h3>
            <p className="text-gray-600">Check-in émotionnel anonyme, IA Zéna & suivi du ressenti collectif.</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-3">Comprendre</h3>
            <p className="text-gray-600">Score QVT, dashboard RH et détection précoce des risques psychosociaux.</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-3">Agir</h3>
            <p className="text-gray-600">Box bien-être ciblées et plans d’action adaptés à chaque équipe.</p>
          </div>
        </div>
      </section>

      {/* --- Section 3 : Témoignages --- */}
      <section className="py-20 px-6 text-center max-w-4xl">
        <h2 className="text-3xl font-semibold mb-8 text-primary">Ils nous font confiance</h2>
        <blockquote className="italic text-gray-600 mb-6">
          “Avec QVT Box, nous avons enfin une vision émotionnelle claire de nos équipes.
          C’est simple, humain et mesurable.”  
        </blockquote>
        <p className="font-semibold">— Responsable RH, secteur industriel</p>
      </section>

      {/* --- CTA final --- */}
      <section className="py-20 bg-primary text-white w-full text-center">
        <h2 className="text-3xl font-semibold mb-4">Passez à la QVT augmentée</h2>
        <p className="mb-8">Découvrez comment l’IA émotionnelle et les box bien-être transforment vos équipes.</p>
        <a
          href="/contact"
          className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Demander une démo
        </a>
      </section>
    </div>
  )
}
