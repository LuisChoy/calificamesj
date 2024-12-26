// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://cmijavrpqpniobzwtwbu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtaWphdnJwcXBuaW9iend0d2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwODY3MzIsImV4cCI6MjA1MDY2MjczMn0.WkFOsGvK9OBoCEhrEP2SCOKRXzFy5eA3DQ7zTvjd9JI'
)

// src/App.jsx
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'

export default function App() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getServices()
  }, [])

  async function getServices() {
    try {
      const { data, error } = await supabase
        .from('service_ratings')
        .select('*')
      
      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error('Error:', error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Cargando servicios...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Servicios Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service.service_id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{service.service_name}</h2>
            <p>Calificación: {service.average_rating}/5</p>
            <p>Total de reseñas: {service.total_ratings}</p>
          </div>
        ))}
      </div>
    </div>
  )
}