
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-12 w-auto"
                src="/lovable-uploads/e54f55e6-f00a-4ee8-ab0a-8e5aa400f3dc.png"
                alt="Conecta Brasil"
              />
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a href="#como-funciona" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
              Como Funciona
            </a>
            <a href="#para-clientes" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
              Para Clientes
            </a>
            <a href="#para-prestadores" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
              Para Prestadores
            </a>
            <a href="#servicos" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
              Serviços
            </a>
            <a href="#faq" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
              FAQ
            </a>
            <Button variant="outline" className="ml-4 border-primary text-primary hover:bg-primary hover:text-white">
              Entrar
            </Button>
            <Button variant="default" className="ml-2 bg-primary text-white hover:bg-primary/90">
              Cadastrar
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-2">
            <a
              href="#como-funciona"
              className="text-gray-700 hover:text-primary px-3 py-2 text-base font-medium border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Como Funciona
            </a>
            <a
              href="#para-clientes"
              className="text-gray-700 hover:text-primary px-3 py-2 text-base font-medium border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Para Clientes
            </a>
            <a
              href="#para-prestadores"
              className="text-gray-700 hover:text-primary px-3 py-2 text-base font-medium border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Para Prestadores
            </a>
            <a
              href="#servicos"
              className="text-gray-700 hover:text-primary px-3 py-2 text-base font-medium border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </a>
            <a
              href="#faq"
              className="text-gray-700 hover:text-primary px-3 py-2 text-base font-medium border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Entrar
              </Button>
              <Button variant="default" className="bg-primary text-white hover:bg-primary/90">
                Cadastrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
