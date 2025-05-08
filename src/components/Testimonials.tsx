
import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ana Silva",
    role: "Cliente",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote:
      "Encontrei um ótimo eletricista para resolver problemas na minha casa. Foi rápido, seguro e o profissional era muito qualificado!",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Oliveira",
    role: "Prestador de Serviço - Pintor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    quote:
      "Depois que me cadastrei no Conecta Brasil, minha agenda está sempre cheia. Os clientes são sérios e consigo atender apenas na minha região.",
    rating: 5,
  },
  {
    id: 3,
    name: "Mariana Costa",
    role: "Cliente",
    image: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote:
      "Precisava reformar meu banheiro e através da plataforma recebi várias propostas de profissionais qualificados. Recomendo muito!",
    rating: 4,
  },
  {
    id: 4,
    name: "Roberto Alves",
    role: "Prestador de Serviço - Encanador",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote:
      "O sistema de créditos é muito justo. Só pago para ver os contatos que realmente me interessam, e o retorno tem sido excelente.",
    rating: 5,
  },
];

const Testimonials = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            O que dizem sobre nós
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Veja os depoimentos de clientes e prestadores de serviço que já utilizam o Conecta Brasil.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="mt-3 text-base text-gray-700">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
