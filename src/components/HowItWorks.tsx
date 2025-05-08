
import { Check } from "lucide-react";

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="section bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Como funciona o <span className="text-primary">Conecta Brasil</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            Um processo simples e eficiente para conectar clientes a prestadores de serviços de qualidade.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {/* Para Clientes */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-primary p-6">
                <h3 className="text-2xl font-bold text-white">Para Clientes</h3>
                <p className="mt-2 text-white opacity-90">
                  Encontre profissionais qualificados para seus projetos sem custo algum.
                </p>
              </div>
              <div className="p-6">
                <ol className="space-y-6">
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-50 text-primary font-bold">
                        1
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Cadastro simples e gratuito</h4>
                      <p className="mt-1 text-gray-500">
                        Crie sua conta via e-mail, telefone ou rede social em menos de 1 minuto.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-50 text-primary font-bold">
                        2
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Descreva seu serviço</h4>
                      <p className="mt-1 text-gray-500">
                        Informe o tipo de serviço, detalhes, localização, data preferencial e fotos.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-50 text-primary font-bold">
                        3
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Receba propostas</h4>
                      <p className="mt-1 text-gray-500">
                        Profissionais interessados da sua região entrarão em contato com você diretamente.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-50 text-primary font-bold">
                        4
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Escolha o melhor profissional</h4>
                      <p className="mt-1 text-gray-500">
                        Compare avaliações, portifolio e escolha o prestador que melhor atende às suas necessidades.
                      </p>
                    </div>
                  </li>
                </ol>
                <div className="mt-8 flex justify-center">
                  <a 
                    href="#" 
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
                  >
                    Cadastre-se como cliente
                  </a>
                </div>
              </div>
            </div>

            {/* Para Prestadores de Serviço */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-accent p-6">
                <h3 className="text-2xl font-bold text-white">Para Prestadores</h3>
                <p className="mt-2 text-white opacity-90">
                  Amplie sua carteira de clientes e receba novas oportunidades de negócio.
                </p>
              </div>
              <div className="p-6">
                <ol className="space-y-6">
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-accent/10 text-accent font-bold">
                        1
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Crie seu perfil profissional</h4>
                      <p className="mt-1 text-gray-500">
                        Cadastre-se e monte seu perfil com fotos, áreas de atuação e experiência.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-accent/10 text-accent font-bold">
                        2
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Receba notificações de serviços</h4>
                      <p className="mt-1 text-gray-500">
                        Seja alertado por e-mail/push quando surgirem demandas na sua região e área de atuação.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-accent/10 text-accent font-bold">
                        3
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Adquira créditos</h4>
                      <p className="mt-1 text-gray-500">
                        Compre créditos para desbloquear os contatos dos clientes que te interessam.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-accent/10 text-accent font-bold">
                        4
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Feche negócios</h4>
                      <p className="mt-1 text-gray-500">
                        Entre em contato diretamente com os clientes e ofereça seus serviços.
                      </p>
                    </div>
                  </li>
                </ol>
                <div className="mt-8 flex justify-center">
                  <a 
                    href="#" 
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-accent bg-secondary hover:bg-secondary/90"
                  >
                    Cadastre-se como prestador
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
