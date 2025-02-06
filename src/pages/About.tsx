import { FaDumbbell, FaHeartbeat, FaUsers } from 'react-icons/fa'

export default function About() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Sobre Nosotros</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            En SetubalFitLife, nos dedicamos a transformar vidas a través del fitness y la nutrición personalizada.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <FaDumbbell className="h-5 w-5 flex-none text-indigo-600" />
                Experiencia
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Más de 10 años transformando vidas a través del fitness.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <FaHeartbeat className="h-5 w-5 flex-none text-indigo-600" />
                Compromiso
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Dedicados a tu salud y bienestar integral.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <FaUsers className="h-5 w-5 flex-none text-indigo-600" />
                Comunidad
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Una comunidad activa y motivadora.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
