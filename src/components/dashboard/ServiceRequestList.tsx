
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "@/contexts/AuthContext";

type ServiceRequest = {
  id: string;
  title: string;
  category: string;
  status: string;
  created_at: string;
  location: string;
};

const ServiceRequestList = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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

  const statusColors: Record<string, string> = {
    open: "bg-green-500",
    in_progress: "bg-yellow-500",
    completed: "bg-blue-500",
    cancelled: "bg-red-500",
  };

  if (loading) {
    return <div>Carregando pedidos...</div>;
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-8">
        <p>Você ainda não tem pedidos de serviço.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Título</th>
            <th className="px-4 py-2 text-left">Categoria</th>
            <th className="px-4 py-2 text-left">Local</th>
            <th className="px-4 py-2 text-left">Data</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{request.title}</td>
              <td className="px-4 py-2">{request.category}</td>
              <td className="px-4 py-2">{request.location}</td>
              <td className="px-4 py-2">
                {format(new Date(request.created_at), "dd/MM/yyyy", { locale: ptBR })}
              </td>
              <td className="px-4 py-2">
                <Badge className={statusColors[request.status] || "bg-gray-500"}>
                  {request.status === "open" && "Aberto"}
                  {request.status === "in_progress" && "Em andamento"}
                  {request.status === "completed" && "Concluído"}
                  {request.status === "cancelled" && "Cancelado"}
                  {!["open", "in_progress", "completed", "cancelled"].includes(request.status) && request.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceRequestList;
