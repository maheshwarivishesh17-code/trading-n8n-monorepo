import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function Signup() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p className="mt-4 text-white/70">Signup flow placeholder.</p>
      </main>
      <Footer />
    </div>
  )
}

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}
