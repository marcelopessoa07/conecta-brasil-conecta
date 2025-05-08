
import React from "react";

const categories = [
  {
    icon: "🔧",
    name: "Encanador",
    description: "Reparos em encanamentos, vazamentos e instalações hidráulicas",
  },
  {
    icon: "⚡",
    name: "Eletricista",
    description: "Instalações e reparos elétricos residenciais e comerciais",
  },
  {
    icon: "🧹",
    name: "Limpeza",
    description: "Serviços de limpeza residencial e comercial",
  },
  {
    icon: "🎨",
    name: "Pintor",
    description: "Pintura de ambientes internos e externos",
  },
  {
    icon: "🔨",
    name: "Pedreiro",
    description: "Construções, reformas e acabamentos",
  },
  {
    icon: "🪓",
    name: "Carpinteiro",
    description: "Trabalhos em madeira, móveis e estruturas",
  },
  {
    icon: "❄️",
    name: "Ar-Condicionado",
    description: "Instalação e manutenção de sistemas de refrigeração",
  },
  {
    icon: "🧰",
    name: "Marceneiro",
    description: "Móveis planejados e reparos em madeira",
  },
];

const ServiceCategories = () => {
  return (
    <section id="servicos" className="section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Categorias de Serviços
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Encontre profissionais qualificados para diversos tipos de serviços
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div key={category.name} className="group relative bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{category.description}</p>
              <a href="#" className="mt-3 text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center">
                Encontrar profissionais
                <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
          >
            Ver todas as categorias
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
