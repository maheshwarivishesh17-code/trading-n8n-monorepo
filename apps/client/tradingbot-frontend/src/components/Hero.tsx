import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero(){
  return (
    <section className="bg-[var(--bg-secondary)] py-24">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">Automate Your Trading Workflows</h1>
          <p className="text-white/70 mb-6">Build powerful trading bots without code — visually compose triggers, actions and strategies.</p>
          <div className="flex gap-3">
            <Link to="/signup" className="px-4 py-2 bg-[var(--accent)] text-black rounded">Get Started</Link>
            <a href="#demo" className="px-4 py-2 border rounded border-white/10">View Demo</a>
          </div>
        </div>
        <div className="flex-1">
          <div className="card">[Mock visual builder preview]</div>
        </div>
      </div>
    </section>
  )
}
