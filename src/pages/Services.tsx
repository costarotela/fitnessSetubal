export default function Services() {
  const services = [
    {
      title: "Entrenamiento Personal",
      description: "Sesiones uno a uno con entrenadores certificados",
      price: "Desde $50/sesión"
    },
    {
      title: "Planes de Nutrición",
      description: "Dietas personalizadas según tus objetivos",
      price: "Desde $80/mes"
    },
    {
      title: "Clases Grupales",
      description: "Variedad de clases para todos los niveles",
      price: "Desde $30/clase"
    },
    {
      title: "Plan Premium",
      description: "Acceso completo a todos los servicios",
      price: "Desde $150/mes"
    }
  ]

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nuestros Servicios</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Ofrecemos una amplia gama de servicios diseñados para ayudarte a alcanzar tus objetivos.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {services.map((service, index) => (
            <article key={index} className="flex flex-col items-start justify-between border-2 border-gray-200 rounded-2xl p-8">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime="2020-03-16" className="text-gray-500">{service.price}</time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  {service.title}
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{service.description}</p>
              </div>
              <div className="mt-8">
                <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Más información
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
