
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/integrations/supabase/database-types";
import { Link, useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";

type ServiceRequest = Database['public']['Tables']['service_requests']['Row'] & {
  provider_name?: string;
};

const ServiceRequestList = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from("service_requests")
          .select("*")
          .eq("client_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching requests:", error);
          return;
        }

        // Fetch provider information for accepted requests
        const requestsWithProviders = await Promise.all(
          (data || []).map(async (request) => {
            if (request.accepted_provider_id) {
              const { data: providerData } = await supabase
                .from("profiles")
                .select("name")
                .eq("id", request.accepted_provider_id)
                .single();
              
              return {
                ...request,
                provider_name: providerData?.name || "Prestador"
              };
            }
            return request;
          })
        );

        setRequests(requestsWithProviders);
      } catch (error) {
        console.error("Error in fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user?.id]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="default">Em aberto</Badge>;
      case "accepted":
        return <Badge variant="success" className="bg-green-500">Recebido por prestador</Badge>;
      case "in_progress":
        return <Badge variant="secondary">Em andamento</Badge>;
      case "completed":
        return <Badge variant="outline">Concluído</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const viewRequestDetails = (id: string) => {
    navigate(`/request/${id}`);
  };

  if (loading) {
    return <div>Carregando solicitações...</div>;
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-8">
        <p>Você ainda não tem solicitações de serviço.</p>
        <Button className="mt-4" asChild>
          <Link to="/new-request">Criar Solicitação</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <div
          key={request.id}
          className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center justify-between"
        >
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{request.title}</h3>
              {getStatusBadge(request.status)}
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {format(new Date(request.created_at), "dd 'de' MMMM 'de' yyyy", {
                locale: ptBR,
              })}
            </p>
            <p className="text-sm">{request.description.substring(0, 100)}...</p>
            
            {request.status === "accepted" && request.provider_name && (
              <div className="mt-2 text-sm text-green-600">
                <p>Prestador interessado: {request.provider_name}</p>
                <Link 
                  to={`/provider/${request.accepted_provider_id}`}
                  className="text-primary inline-flex items-center mt-1 hover:underline"
                >
                  Ver perfil do prestador <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => viewRequestDetails(request.id)}
            >
              Ver Detalhes
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceRequestList;
