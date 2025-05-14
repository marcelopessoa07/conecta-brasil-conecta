
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, MapPin, Phone, Mail, Star } from "lucide-react";

type PortfolioItem = {
  id: string;
  provider_id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
};

const ProviderPortfolio = () => {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<any>(null);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        // Fetch provider profile
        const { data: providerData, error: providerError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();

        if (providerError) {
          console.error("Error fetching provider:", providerError);
          return;
        }

        setProvider(providerData);

        // Fetch provider portfolio
        const { data: portfolioData, error: portfolioError } = await supabase
          .from("provider_portfolio")
          .select("*")
          .eq("provider_id", id)
          .order("created_at", { ascending: false });

        if (!portfolioError) {
          setPortfolio(portfolioData || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProviderData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div>Carregando portfólio do prestador...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Prestador não encontrado</h2>
            <p>O portfólio deste prestador não está disponível.</p>
            <Button className="mt-4" asChild>
              <Link to="/">Voltar para a página inicial</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-4xl">
                  {provider.photo ? (
                    <img src={provider.photo} alt={provider.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    provider.name?.charAt(0)
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl md:text-3xl font-bold">{provider.name}</h1>
                    {provider.verified && (
                      <BadgeCheck className="h-6 w-6 text-blue-500" />
                    )}
                  </div>
                  <p className="text-lg text-muted-foreground mb-2">
                    {provider.profession || "Profissional"}
                  </p>

                  <div className="flex items-center gap-1 mb-3">
                    {provider.rating && (
                      <div className="flex items-center mr-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span>{provider.rating}</span>
                        <span className="text-muted-foreground ml-1">
                          ({provider.reviews_count || 0} avaliações)
                        </span>
                      </div>
                    )}
                    {provider.completed_jobs > 0 && (
                      <span className="text-green-600 text-sm font-medium">
                        {provider.completed_jobs} serviços concluídos
                      </span>
                    )}
                  </div>

                  {provider.location && (
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{provider.location}</span>
                    </div>
                  )}
                </div>

                <div className="w-full md:w-auto mt-4 md:mt-0">
                  <div className="space-y-2">
                    {provider.phone && (
                      <Button className="w-full flex items-center justify-center gap-2" variant="outline">
                        <Phone className="h-4 w-4" />
                        {provider.phone}
                      </Button>
                    )}
                    <Button className="w-full flex items-center justify-center gap-2" variant="default">
                      <Mail className="h-4 w-4" />
                      Contatar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-4">Portfólio</h2>
          
          {portfolio.length === 0 ? (
            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <h3 className="text-lg font-medium">Este prestador ainda não possui itens no portfólio</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Volte mais tarde para ver os trabalhos deste profissional
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {portfolio.map((item) => (
                <Card key={item.id}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          <div className="mt-6">
            <Button asChild variant="outline">
              <Link to={`/provider/${id}`}>Ver perfil completo do prestador</Link>
            </Button>
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderPortfolio;
