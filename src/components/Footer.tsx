import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link to="/about" className="text-gray-400 hover:text-gray-500">
            Sobre Nosotros
          </Link>
          <Link to="/services" className="text-gray-400 hover:text-gray-500">
            Servicios
          </Link>
          <Link to="/premium" className="text-gray-400 hover:text-gray-500">
            Premium
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; 2023 SetubalFitLife. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
