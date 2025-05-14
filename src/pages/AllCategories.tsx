
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ListTree, Grid3X3, ArrowLeft } from "lucide-react";

// Original categories (imported from ServiceCategories)
const existingCategories = [
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
  }
];

// Additional categories that don't duplicate existing ones
const additionalCategories = [
  {
    icon: "🔌",
    name: "Instalação de Tomadas",
    description: "Instalação e reparos de tomadas e pontos de energia",
  },
  {
    icon: "🚿",
    name: "Instalação de Chuveiros",
    description: "Instalação e manutenção de chuveiros e aquecedores",
  },
  {
    icon: "🚪",
    name: "Portas e Janelas",
    description: "Instalação, reparo e manutenção de portas e janelas",
  },
  {
    icon: "🧱",
    name: "Alvenaria",
    description: "Construção de paredes, muros e estruturas de alvenaria",
  },
  {
    icon: "🚽",
    name: "Instalação de Sanitários",
    description: "Instalação e manutenção de vasos sanitários e pias",
  },
  {
    icon: "🏊",
    name: "Manutenção de Piscinas",
    description: "Limpeza e manutenção de piscinas residenciais",
  },
  {
    icon: "🏠",
    name: "Telhados",
    description: "Instalação e reparo de telhados e coberturas",
  },
  {
    icon: "🌳",
    name: "Jardinagem",
    description: "Paisagismo e manutenção de jardins",
  },
  {
    icon: "🛠️",
    name: "Montagem de Móveis",
    description: "Montagem e desmontagem de móveis pré-fabricados",
  },
  {
    icon: "🔒",
    name: "Chaveiro",
    description: "Cópias de chaves e abertura de fechaduras",
  },
  {
    icon: "📺",
    name: "Técnico em Eletrônicos",
    description: "Reparos em TVs e equipamentos eletrônicos",
  },
  {
    icon: "🦟",
    name: "Dedetização",
    description: "Controle de pragas e insetos",
  },
  {
    icon: "🪑",
    name: "Estofados",
    description: "Limpeza e reparos em estofados e sofás",
  },
  {
    icon: "🪞",
    name: "Vidraceiro",
    description: "Instalação e reparo de vidros e espelhos",
  },
  {
    icon: "🧯",
    name: "Segurança contra incêndio",
    description: "Instalação e manutenção de sistemas de segurança contra incêndios",
  },
  {
    icon: "🧽",
    name: "Impermeabilização",
    description: "Serviços de impermeabilização de áreas úmidas e lajes",
  }
];

// Combine all categories for the complete list
const allCategories = [...existingCategories, ...additionalCategories];

const AllCategories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">Todas as Categorias de Serviços</h1>
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Voltar para Home
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" className="flex items-center gap-2">
              <ListTree size={16} />
              Listar por Tipo
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Grid3X3 size={16} />
              Ver em Grade
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {allCategories.map((category, index) => (
              <div 
                key={`${category.name}-${index}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{category.description}</p>
                <Button variant="link" className="mt-3 text-primary p-0 h-auto">
                  Encontrar profissionais
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllCategories;
