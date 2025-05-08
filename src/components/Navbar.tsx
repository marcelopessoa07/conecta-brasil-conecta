
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img
                  className="h-12 w-auto"
                  src="/lovable-uploads/e54f55e6-f00a-4ee8-ab0a-8e5aa400f3dc.png"
                  alt="Conecta Brasil"
                />
              </Link>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {!user ? (
              <>
                <Link to="/#como-funciona" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                  Como Funciona
                </Link>
                <Link to="/#para-clientes" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                  Para Clientes
                </Link>
                <Link to="/#para-prestadores" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                  Para Prestadores
                </Link>
                <Link to="/#servicos" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                  Serviços
                </Link>
                <Link to="/#faq" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                  FAQ
                </Link>
                <Button 
                  variant="outline" 
                  className="ml-4 border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => navigate("/auth")}
                >
                  Entrar
                </Button>
                <Button 
                  variant="default" 
                  className="ml-2 bg-primary text-white hover:bg-primary/90"
                  onClick={() => navigate("/auth?tab=register")}
                >
                  Cadastrar
                </Button>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                  Dashboard
                </Link>
                {user.profile?.user_type === 'client' && (
                  <Link to="/new-request" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                    Novo Pedido
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  className="ml-4 border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => signOut()}
                >
                  Sair
                </Button>
              </>
            )}
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
            {!user ? (
              <>
                <Link
                  to="/#como-funciona"
                  className="text-gray-700 hover:text-primary px-3 py-2 text-base font-medium border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Como Funciona
                </Link>
                <Link
                  to="/#para-clientes"
                  className="text-gray-700 hover:text-primary px-3 py-2 text-base font-medium border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Para Clientes
                </Link>
                <Link
                  to="/#para-prestadores"
                  className="text-gray-700 hover:text-primary px-3 py-2 text-base font-medium border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Para Prestadores
                </Link>
                <Link
                  to="/#servicos"
                  className="text-gray-700 hover:text-primary px-3 py-2 text-base font-medium border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Serviços
                </Link>
                <Link
                  to="/#faq"
                  className="text-gray-700 hover:text-primary px-3 py-2 text-base font-medium border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
                <div className="flex flex-col space-y-2 pt-2">
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => {
                      navigate("/auth");
                      setIsMenuOpen(false);
                    }}
                  >
                    Entrar
                  </Button>
                  <Button 
                    variant="default" 
                    className="bg-primary text-white hover:bg-primary/90"
                    onClick={() => {
                      navigate("/auth?tab=register");
                      setIsMenuOpen(false);
                    }}
                  >
                    Cadastrar
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary px-3 py-2 text-base font-medium border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {user.profile?.user_type === 'client' && (
                  <Link
                    to="/new-request"
                    className="text-gray-700 hover:text-primary px-3 py-2 text-base font-medium border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Novo Pedido
                  </Link>
                )}
                <div className="flex flex-col space-y-2 pt-2">
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    Sair
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
