
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/database-types";

type ServiceRequest = Database['public']['Tables']['service_requests']['Row'];

const ServiceRequestMarketplace = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [unlocks, setUnlocks] = useState<Record<string, boolean>>({});
  const { user } = useAuth();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data, error } = await supabase
          .from("service_requests")
          .select("*")
          .eq("status", "open")
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

    const fetchUnlocks = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from("contact_unlocks")
          .select("request_id")
          .eq("provider_id", user.id);

        if (error) {
          console.error("Error fetching unlocks:", error);
          return;
        }

        const unlocksMap: Record<string, boolean> = {};
        data?.forEach(item => {
          unlocksMap[item.request_id] = true;
        });

        setUnlocks(unlocksMap);
      } catch (error) {
        console.error("Error in fetch unlocks:", error);
      }
    };

    fetchRequests();
    fetchUnlocks();
  }, [user?.id]);

  const handleUnlock = async (requestId: string) => {
    if (!user?.id) {
      toast.error("Você precisa estar logado para desbloquear contatos.");
      return;
    }

    // 1. Check if user has enough credits
    const { data: creditsData, error: creditsError } = await supabase
      .from("provider_credits")
      .select("credits")
      .eq("provider_id", user.id)
      .single();

    if (creditsError || !creditsData) {
      toast.error("Erro ao verificar seus créditos. Tente novamente.");
      console.error("Error checking credits:", creditsError);
      return;
    }

    if (creditsData.credits < 1) {
      toast.error("Você não tem créditos suficientes para desbloquear este contato.");
      return;
    }

    // 2. Create contact unlock record
    const { error: unlockError } = await supabase
      .from("contact_unlocks")
      .insert({
        provider_id: user.id,
        request_id: requestId,
        credits_used: 1
      });

    if (unlockError) {
      if (unlockError.code === "23505") { // Unique violation
        toast.error("Você já desbloqueou este contato anteriormente.");
      } else {
        toast.error("Erro ao desbloquear contato. Tente novamente.");
        console.error("Error creating unlock:", unlockError);
      }
      return;
    }

    // 3. Reduce credits
    const { error: updateError } = await supabase
      .from("provider_credits")
      .update({ 
        credits: creditsData.credits - 1,
        updated_at: new Date().toISOString()
      })
      .eq("provider_id", user.id);

    if (updateError) {
      toast.error("Erro ao atualizar seus créditos. Contate o suporte.");
      console.error("Error updating credits:", updateError);
      return;
    }

    // 4. Record transaction
    await supabase
      .from("credit_transactions")
      .insert({
        provider_id: user.id,
        amount: -1,
        transaction_type: "unlock",
        status: "completed"
      });

    // 5. Update UI
    setUnlocks(prev => ({
      ...prev,
      [requestId]: true
    }));

    toast.success("Contato desbloqueado com sucesso!");
  };

  if (loading) {
    return <div>Carregando oportunidades...</div>;
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-8">
        <p>Não há pedidos disponíveis no momento.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {requests.map((request) => (
        <Card key={request.id}>
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-1">{request.title}</h3>
            <div className="text-sm text-gray-500 mb-2">
              <span className="mr-2">
                {format(new Date(request.created_at), "dd/MM/yyyy", { locale: ptBR })}
              </span>
              <span>·</span>
              <span className="ml-2">{request.location}</span>
            </div>
            <div className="mb-2">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {request.category}
              </span>
            </div>
            <p className="text-gray-700 mb-4 line-clamp-2">{request.description}</p>
            
            {unlocks[request.id] ? (
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Ver Contato do Cliente
              </Button>
            ) : (
              <Button 
                onClick={() => handleUnlock(request.id)} 
                className="w-full bg-primary hover:bg-primary/90"
              >
                Desbloquear Contato (1 crédito)
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServiceRequestMarketplace;
