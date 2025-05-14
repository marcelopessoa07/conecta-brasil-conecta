
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Fale Conosco
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Dúvidas, sugestões ou precisa de ajuda? Preencha o formulário abaixo
            e entraremos em contato o mais breve possível.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <ContactForm />
            </div>
          </div>

          <div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Informações de Contato
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-900">Telefone</p>
                    <p className="text-base text-gray-600">(11) 9999-9999</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-900">Email</p>
                    <p className="text-base text-gray-600">
                      contato@conectabrasil.com.br
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-900">Endereço</p>
                    <p className="text-base text-gray-600">
                      Av. Paulista, 1000<br />
                      São Paulo, SP - Brasil<br />
                      CEP: 01310-100
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Horário de Atendimento
                </h3>
                <p className="text-base text-gray-600">
                  Segunda a Sexta: 9:00 - 18:00<br />
                  Sábado: 10:00 - 14:00<br />
                  Domingo: Fechado
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
