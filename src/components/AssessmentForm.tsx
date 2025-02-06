import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type AssessmentData = {
  age: number
  weight: number
  height: number
  goal: string
  activity_level: string
  medical_conditions: string
  dietary_restrictions: string
  training_experience: string
  preferred_training_days: string[]
  sleep_hours: number
}

const AssessmentForm = ({ userId, onComplete }: { userId: string, onComplete: () => void }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<AssessmentData>({
    age: 0,
    weight: 0,
    height: 0,
    goal: '',
    activity_level: '',
    medical_conditions: '',
    dietary_restrictions: '',
    training_experience: '',
    preferred_training_days: [],
    sleep_hours: 7
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (day: string) => {
    setFormData(prev => ({
      ...prev,
      preferred_training_days: prev.preferred_training_days.includes(day)
        ? prev.preferred_training_days.filter(d => d !== day)
        : [...prev.preferred_training_days, day]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase
        .from('user_assessments')
        .insert([
          {
            user_id: userId,
            ...formData
          }
        ])

      if (error) throw error
      onComplete()
    } catch (error) {
      console.error('Error saving assessment:', error)
      alert('Error al guardar la evaluación. Por favor, intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Edad</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Peso (kg)</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Altura (cm)</label>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Objetivo Principal</label>
        <select
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Selecciona un objetivo</option>
          <option value="weight_loss">Pérdida de peso</option>
          <option value="muscle_gain">Ganancia muscular</option>
          <option value="maintenance">Mantenimiento</option>
          <option value="fitness">Mejora de condición física</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nivel de Actividad</label>
        <select
          name="activity_level"
          value={formData.activity_level}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Selecciona tu nivel de actividad</option>
          <option value="sedentary">Sedentario</option>
          <option value="lightly_active">Ligeramente activo</option>
          <option value="moderately_active">Moderadamente activo</option>
          <option value="very_active">Muy activo</option>
          <option value="extra_active">Extremadamente activo</option>
        </select>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Condiciones Médicas</label>
        <textarea
          name="medical_conditions"
          value={formData.medical_conditions}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Describe cualquier condición médica relevante"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Restricciones Dietéticas</label>
        <textarea
          name="dietary_restrictions"
          value={formData.dietary_restrictions}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Alergias, intolerancias o preferencias dietéticas"
        />
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Experiencia en Entrenamiento</label>
        <select
          name="training_experience"
          value={formData.training_experience}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Selecciona tu nivel de experiencia</option>
          <option value="beginner">Principiante</option>
          <option value="intermediate">Intermedio</option>
          <option value="advanced">Avanzado</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Días Preferidos de Entrenamiento</label>
        <div className="mt-2 space-y-2">
          {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => (
            <label key={day} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                checked={formData.preferred_training_days.includes(day)}
                onChange={() => handleCheckboxChange(day)}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span className="ml-2">{day}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Horas de Sueño Promedio</label>
        <input
          type="number"
          name="sleep_hours"
          value={formData.sleep_hours}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Evaluación Inicial</h2>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-1/4 h-2 ${
                stepNumber <= step ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs">Datos Básicos</span>
          <span className="text-xs">Objetivos</span>
          <span className="text-xs">Salud</span>
          <span className="text-xs">Entrenamiento</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}

        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Anterior
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(s => s + 1)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 ml-auto"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 ml-auto disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Finalizar'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default AssessmentForm
