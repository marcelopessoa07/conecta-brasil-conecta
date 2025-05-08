
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Como funciona para clientes?",
    answer:
      "Como cliente, você se cadastra gratuitamente, descreve o serviço que precisa, informa sua localização e preferência de data. Profissionais interessados verão sua solicitação e poderão entrar em contato com você para oferecer seus serviços.",
  },
  {
    question: "Como funciona para prestadores de serviço?",
    answer:
      "Como prestador, você cria seu perfil detalhando suas áreas de atuação e experiência. Você receberá notificações sobre novos serviços em sua região. Para ver os dados de contato dos clientes, você precisará adquirir créditos na plataforma.",
  },
  {
    question: "Quanto custa usar o Conecta Brasil?",
    answer:
      "Para clientes, o serviço é 100% gratuito. Para prestadores de serviço, há o custo de créditos para desbloquear contatos dos clientes. Os valores dos créditos variam conforme a quantidade adquirida.",
  },
  {
    question: "Como compro créditos?",
    answer:
      "Prestadores de serviço podem comprar créditos diretamente na plataforma usando cartão de crédito ou Pix. Há pacotes com diferentes quantidades e valores, permitindo escolher a opção mais adequada para o seu volume de negócios.",
  },
  {
    question: "O Conecta Brasil está disponível em todo o Brasil?",
    answer:
      "Sim, a plataforma atende todo o território nacional. As buscas são organizadas por CEP e bairro, permitindo que clientes e prestadores se encontrem na mesma região.",
  },
  {
    question: "Como funciona a avaliação de prestadores?",
    answer:
      "Após a conclusão do serviço, os clientes podem avaliar os prestadores com notas e comentários. Essas avaliações ficam visíveis no perfil do prestador, ajudando outros clientes a tomarem decisões informadas.",
  },
  {
    question: "Posso cancelar uma solicitação de serviço?",
    answer:
      "Sim, clientes podem cancelar solicitações a qualquer momento antes da contratação efetiva de um prestador. Após a contratação, recomendamos entrar em contato diretamente com o prestador.",
  },
  {
    question: "Os créditos têm prazo de validade?",
    answer:
      "Os créditos adquiridos por prestadores têm validade de 12 meses a partir da data de compra. Recomendamos utilizá-los dentro desse período para não perdê-los.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Perguntas Frequentes
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Tire suas dúvidas sobre o funcionamento do Conecta Brasil
          </p>
        </div>

        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium text-gray-900 hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-base text-gray-500">
            Ainda tem dúvidas? Entre em contato com nosso suporte
          </p>
          <a
            href="#"
            className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90"
          >
            Fale Conosco
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
