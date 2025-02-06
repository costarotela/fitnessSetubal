import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FaUserCircle } from 'react-icons/fa'

export default function Navbar() {
  const { user, profile, signOut } = useAuth()

  const handleLogout = async () => {
    try {
      console.log('Iniciando cierre de sesión...')
      await signOut()
      // No es necesario hacer nada más aquí, el signOut ya maneja la redirección
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      alert('Error al cerrar sesión. Por favor, intenta de nuevo.')
    }
  }

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">SetubalFitLife</span>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Inicio</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">Nosotros</Link>
            <Link to="/services" className="text-gray-600 hover:text-gray-900">Servicios</Link>
            <Link to="/premium" className="text-gray-600 hover:text-gray-900">Premium</Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FaUserCircle className="h-6 w-6 text-gray-400" />
                  <span className="text-sm text-gray-700">{user.email}</span>
                </div>
                {profile?.premium_access && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Premium
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
