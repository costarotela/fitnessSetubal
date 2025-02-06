import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaDumbbell, FaHeartbeat, FaWeight, FaRuler, FaAppleAlt } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'

const Assessment = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    goal: '',
    experience: '',
    limitations: '',
    schedule: [] as string[],
    diet: '',
    allergies: '',
    supplements: ''
  })

  useEffect(() => {
    setProgress((currentStep / 5) * 100)
  }, [currentStep])

  const handleSubmit = async () => {
    try {
      const { error } = await supabase
        .from('user_assessments')
        .insert([
          {
            user_id: user?.id,
            ...formData,
            created_at: new Date()
          }
        ])

      if (error) throw error

      navigate('/workout-plan')
    } catch (error) {
      console.error('Error saving assessment:', error)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900">Datos Básicos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Edad</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Edad"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FaHeartbeat className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Peso (kg)</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Peso"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FaWeight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Altura (cm)</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Altura"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FaRuler className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900">Objetivos y Experiencia</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Objetivo Principal</label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Selecciona un objetivo</option>
                  <option value="weight_loss">Pérdida de peso</option>
                  <option value="muscle_gain">Ganancia muscular</option>
                  <option value="strength">Fuerza</option>
                  <option value="endurance">Resistencia</option>
                  <option value="general_fitness">Fitness general</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nivel de Experiencia</label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Selecciona tu nivel</option>
                  <option value="beginner">Principiante</option>
                  <option value="intermediate">Intermedio</option>
                  <option value="advanced">Avanzado</option>
                </select>
              </div>
            </div>
          </motion.div>
        )
      // ... Continuar con los demás casos
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-8">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                      Progreso
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-indigo-600">
                      {progress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                  />
                </div>
              </div>
            </div>

            {renderStep()}

            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(current => current - 1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Anterior
                </button>
              )}
              {currentStep < 5 ? (
                <button
                  onClick={() => setCurrentStep(current => current + 1)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Finalizar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Assessment
