
import React from "react";
import { Check } from "lucide-react";

const Benefits = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Para Clientes */}
          <div id="para-clientes" className="mb-16 lg:mb-0">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Vantagens para <span className="text-primary">Clientes</span>
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Encontre os melhores profissionais para seus projetos de forma rápida e segura.
              </p>
            </div>
            <div className="mt-10">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">
                    <strong>Totalmente gratuito</strong> - Sem nenhum custo para solicitar serviços
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">
                    <strong>Profissionais avaliados</strong> - Veja avaliações de outros clientes antes de contratar
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">
                    <strong>Múltiplas propostas</strong> - Compare orçamentos e escolha a melhor opção
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">
                    <strong>Profissionais próximos</strong> - Encontre prestadores na sua região
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">
                    <strong>Histórico organizado</strong> - Acompanhe todos os seus serviços solicitados
                  </p>
                </li>
              </ul>
              <div className="mt-10">
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
                >
                  Preciso de um serviço
                </a>
              </div>
            </div>
          </div>

          {/* Para Prestadores */}
          <div id="para-prestadores">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Vantagens para <span className="text-accent">Prestadores</span>
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Amplie sua rede de clientes e expanda seu negócio com o Conecta Brasil.
              </p>
            </div>
            <div className="mt-10">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-accent" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">
                    <strong>Novos clientes</strong> - Acesse solicitações de serviços da sua região
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-accent" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">
                    <strong>Cadastro profissional</strong> - Destaque sua experiência e trabalhos realizados
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-accent" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">
                    <strong>Notificações em tempo real</strong> - Seja alertado sobre novas oportunidades
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-accent" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">
                    <strong>Avaliações</strong> - Construa sua reputação através de avaliações positivas
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-accent" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">
                    <strong>Sistema de créditos</strong> - Pague apenas pelos contatos que te interessam
                  </p>
                </li>
              </ul>
              <div className="mt-10">
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-accent bg-secondary hover:bg-secondary/90"
                >
                  Sou prestador de serviço
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
