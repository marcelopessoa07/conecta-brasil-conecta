
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { CreditCard, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ProviderCredits = () => {
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [creditsToAdd, setCreditsToAdd] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCredits = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from("provider_credits")
          .select("credits")
          .eq("provider_id", user.id)
          .single();

        if (error) {
          // If no credits record exists yet, create one with 0 credits
          if (error.code === 'PGRST116') {
            const { error: insertError } = await supabase
              .from("provider_credits")
              .insert({ 
                provider_id: user.id,
                credits: 0
              });
            
            if (!insertError) {
              setCredits(0);
            }
          } else {
            console.error("Error fetching credits:", error);
          }
          return;
        }

        setCredits(data?.credits || 0);
      } catch (error) {
        console.error("Error in fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [user?.id]);

  const handleBuyCredits = async () => {
    if (!user?.id) return;

    // Simulate payment success
    try {
      // 1. Create transaction record
      const { error: transactionError } = await supabase
        .from("credit_transactions")
        .insert({
          provider_id: user.id,
          amount: creditsToAdd,
          transaction_type: "purchase",
          payment_method: "simulado",
          status: "completed"
        });

      if (transactionError) {
        toast.error("Erro ao registrar transação.");
        console.error("Transaction error:", transactionError);
        return;
      }

      // 2. Update credits
      const { error: updateError } = await supabase
        .from("provider_credits")
        .update({ 
          credits: credits + creditsToAdd,
          updated_at: new Date().toISOString()
        })
        .eq("provider_id", user.id);

      if (updateError) {
        toast.error("Erro ao atualizar créditos.");
        console.error("Update error:", updateError);
        return;
      }

      setCredits(prev => prev + creditsToAdd);
      toast.success(`${creditsToAdd} créditos adicionados com sucesso!`);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error buying credits:", error);
      toast.error("Erro ao processar compra de créditos.");
    }
  };

  if (loading) {
    return <div className="text-sm">Carregando créditos...</div>;
  }

  return (
    <div className="flex items-center">
      <div className="text-sm font-medium mr-4">
        <span className="text-muted-foreground">Seus créditos:</span>{" "}
        <span className="font-bold">{credits}</span>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" /> Comprar Créditos
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Comprar Créditos</DialogTitle>
            <DialogDescription>
              Adicione créditos à sua conta para desbloquear contatos de clientes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="credits" className="text-right">
                Quantidade
              </Label>
              <Input
                id="credits"
                type="number"
                min="1"
                value={creditsToAdd}
                onChange={(e) => setCreditsToAdd(parseInt(e.target.value) || 1)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Valor</Label>
              <div className="col-span-3 font-medium">
                R$ {(creditsToAdd * 5).toFixed(2).replace(".", ",")}
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button type="button" onClick={handleBuyCredits} className="bg-primary hover:bg-primary/90">
              <CreditCard className="mr-2 h-4 w-4" /> Finalizar Compra
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProviderCredits;
