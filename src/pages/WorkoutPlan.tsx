import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDumbbell, FaFire, FaHeartbeat, FaAppleAlt, FaClock } from 'react-icons/fa'

const WorkoutPlan = () => {
  const [selectedDay, setSelectedDay] = useState(1)
  const [showNutrition, setShowNutrition] = useState(false)

  const days = [
    { day: 1, focus: 'Pecho y Tríceps' },
    { day: 2, focus: 'Espalda y Bíceps' },
    { day: 3, focus: 'Piernas y Hombros' },
    { day: 4, focus: 'Descanso Activo' },
    { day: 5, focus: 'Push (Empuje)' },
    { day: 6, focus: 'Pull (Jalón)' },
    { day: 7, focus: 'Descanso Total' },
  ]

  const workouts = {
    1: [
      { name: 'Press de Banca', sets: '4', reps: '12', rest: '90s' },
      { name: 'Press Inclinado', sets: '3', reps: '12', rest: '60s' },
      { name: 'Aperturas con Mancuernas', sets: '3', reps: '15', rest: '60s' },
      { name: 'Extensiones de Tríceps', sets: '4', reps: '12', rest: '60s' },
      { name: 'Fondos en Paralelas', sets: '3', reps: '12', rest: '60s' },
    ],
    // ... Definir ejercicios para los demás días
  }

  const nutrition = {
    breakfast: {
      title: 'Desayuno',
      items: [
        'Avena con proteína (50g)',
        'Claras de huevo (6 unidades)',
        'Plátano',
        'Almendras (15g)'
      ],
      macros: { protein: 35, carbs: 45, fats: 15 }
    },
    // ... Definir otras comidas
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl font-bold text-white mb-4">
                Tu Plan de 30 Días
              </h1>
              <p className="text-xl text-indigo-100">
                Personalizado para alcanzar tus objetivos
              </p>
            </motion.div>
          </div>

          <div className="p-8">
            <div className="flex space-x-4 mb-8 overflow-x-auto pb-4">
              {days.map(({ day, focus }) => (
                <motion.button
                  key={day}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDay(day)}
                  className={`flex-shrink-0 px-6 py-3 rounded-lg font-medium ${
                    selectedDay === day
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="block text-sm">Día {day}</span>
                  <span className="block text-xs mt-1">{focus}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode='wait'>
              <motion.div
                key={selectedDay}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Entrenamiento
                    </h3>
                    <FaDumbbell className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="space-y-4">
                    {workouts[selectedDay as keyof typeof workouts]?.map((exercise, index) => (
                      <motion.div
                        key={exercise.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg p-4 shadow-sm"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                          <span className="text-indigo-600 text-sm">
                            {exercise.sets} × {exercise.reps}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <FaClock className="h-4 w-4 mr-1" />
                          Descanso: {exercise.rest}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Nutrición
                    </h3>
                    <FaAppleAlt className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="space-y-4">
                    {Object.entries(nutrition).map(([meal, data]) => (
                      <motion.div
                        key={meal}
                        className="bg-white rounded-lg p-4 shadow-sm"
                      >
                        <h4 className="font-medium text-gray-900 mb-2">{data.title}</h4>
                        <ul className="space-y-2">
                          {data.items.map((item, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex items-center space-x-4 text-sm">
                          <span className="text-blue-600">P: {data.macros.protein}g</span>
                          <span className="text-green-600">C: {data.macros.carbs}g</span>
                          <span className="text-yellow-600">G: {data.macros.fats}g</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 rounded-full p-3">
                    <FaFire className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Calorías</h4>
                    <p className="text-sm text-gray-600">2,400 / día</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <FaHeartbeat className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Cardio</h4>
                    <p className="text-sm text-gray-600">30 min / 3x semana</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <FaAppleAlt className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Comidas</h4>
                    <p className="text-sm text-gray-600">5 / día</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkoutPlan
