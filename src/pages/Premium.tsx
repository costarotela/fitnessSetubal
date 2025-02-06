import { useAuth } from '../contexts/AuthContext'

const Premium = () => {
  const { user, profile } = useAuth()

  console.log('Premium Page:', { user, profile }) // Debug log

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-4">Página Premium</h1>
        
        <div className="mb-4">
          <p>Estado de usuario:</p>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify({ 
              email: user?.email,
              isPremium: profile?.premium_access,
            }, null, 2)}
          </pre>
        </div>

        {!profile?.premium_access ? (
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-yellow-800">Acceso Premium No Disponible</h2>
            <p className="text-yellow-600">Contacta al administrador para obtener acceso premium.</p>
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
              alt="Premium"
              className="mt-4 w-full h-48 object-cover rounded-lg"
            />
          </div>
        ) : (
          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-green-800">¡Bienvenido al Área Premium!</h2>
            <p className="text-green-600">Tienes acceso a todo el contenido premium.</p>
            <img 
              src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2"
              alt="Premium Content"
              className="mt-4 w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Premium
