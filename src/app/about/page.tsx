import Image from 'next/image'

export default function About() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Sobre Nosotros</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            En FitLife, nos dedicamos a transformar vidas a través del fitness y la nutrición personalizada.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
          <div className="relative lg:order-last lg:col-span-5">
            <Image
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b"
              alt="Nuestro equipo"
              width={800}
              height={600}
              className="aspect-[3/2] rounded-2xl object-cover"
            />
          </div>
          <div className="max-w-xl text-base leading-7 text-gray-700 lg:col-span-7">
            <p>
              Fundada en 2020, FitLife nació con la misión de hacer que el fitness y la vida saludable sean accesibles para todos.
              Nuestro equipo de expertos en fitness y nutrición trabaja incansablemente para proporcionar planes personalizados
              que se adaptan a las necesidades únicas de cada individuo.
            </p>
            <ul role="list" className="mt-8 space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <span className="mt-1 h-5 w-5 flex-none text-indigo-600">
                  ✓
                </span>
                <span>
                  <strong className="font-semibold text-gray-900">Entrenadores certificados.</strong> Nuestro equipo está compuesto por profesionales certificados internacionalmente.
                </span>
              </li>
              <li className="flex gap-x-3">
                <span className="mt-1 h-5 w-5 flex-none text-indigo-600">
                  ✓
                </span>
                <span>
                  <strong className="font-semibold text-gray-900">Planes personalizados.</strong> Cada plan se adapta a tus objetivos y necesidades específicas.
                </span>
              </li>
              <li className="flex gap-x-3">
                <span className="mt-1 h-5 w-5 flex-none text-indigo-600">
                  ✓
                </span>
                <span>
                  <strong className="font-semibold text-gray-900">Soporte continuo.</strong> Acompañamiento durante todo tu proceso de transformación.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
