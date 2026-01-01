import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

export default function Landing(){
  useEffect(()=>{
    const els = document.querySelectorAll('.fade-in')
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    els.forEach(el=>io.observe(el))
    return ()=> io.disconnect()
  }, [])

  return (
    <div>
      <Hero />

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card fade-in">
            <div className="text-2xl">🔧</div>
            <h3 className="font-semibold mt-2">Visual Workflow Builder</h3>
            <p className="text-sm mt-1 text-white/70">Drag-and-drop nodes to build trading logic visually.</p>
          </div>
          <div className="card fade-in">
            <div className="text-2xl">⚡</div>
            <h3 className="font-semibold mt-2">Real-time Executions</h3>
            <p className="text-sm mt-1 text-white/70">Monitor executions and logs in real time.</p>
          </div>
          <div className="card fade-in">
            <div className="text-2xl">🌐</div>
            <h3 className="font-semibold mt-2">Multiple Exchange Support</h3>
            <p className="text-sm mt-1 text-white/70">Connect Binance, Alpaca and more through credentials.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
