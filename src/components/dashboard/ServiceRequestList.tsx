
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/integrations/supabase/database-types";
import { Link, useNavigate } from "react-router-dom";

type ServiceRequest = Database['public']['Tables']['service_requests']['Row'];

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

        setRequests(data || []);
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
