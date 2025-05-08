
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const CtaSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleServiceButtonClick = () => {
    if (user) {
      navigate("/new-request");
    } else {
      navigate("/auth");
    }
  };

  return (
    <section className="bg-accent py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Pronto para começar?
          </h2>
          <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
            Junte-se à maior plataforma de conexão entre clientes e prestadores
            de serviço do Brasil.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-col sm:flex-row">
            <Button 
              size="lg" 
              className="bg-white text-accent hover:bg-white/90"
              onClick={handleServiceButtonClick}
            >
              Preciso de um serviço
            </Button>
            <Button 
              size="lg" 
              className="bg-secondary text-accent hover:bg-secondary/90"
              onClick={() => navigate("/auth")}
            >
              Sou prestador de serviço
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
