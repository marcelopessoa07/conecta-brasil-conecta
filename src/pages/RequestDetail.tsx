
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Database } from "@/integrations/supabase/database-types";

type ServiceRequest = Database["public"]["Tables"]["service_requests"]["Row"];

const requestSchema = z.object({
  title: z.string().min(5, "Título deve ter pelo menos 5 caracteres"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  category: z.string().min(2, "Categoria é obrigatória"),
  subcategory: z.string().optional(),
  location: z.string().min(2, "Localização é obrigatória"),
  postal_code: z.string().optional(),
  preferred_date: z.string().optional(),
  status: z.string(),
});

type RequestFormValues = z.infer<typeof requestSchema>;

const RequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      subcategory: "",
      location: "",
      postal_code: "",
      preferred_date: "",
      status: "",
    },
  });

  useEffect(() => {
    const fetchRequest = async () => {
      if (!id || !user) return;

      try {
        const { data, error } = await supabase
          .from("service_requests")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          toast.error("Erro ao carregar solicitação");
          console.error("Error fetching request:", error);
          navigate("/dashboard");
          return;
        }

        // Check if this request belongs to the current user
        if (data.client_id !== user.id) {
          toast.error("Você não tem permissão para ver esta solicitação");
          navigate("/dashboard");
          return;
        }

        setRequest(data);
        
        // Format the date for the form if it exists
        const formattedDate = data.preferred_date 
          ? new Date(data.preferred_date).toISOString().split('T')[0]
          : "";
          
        form.reset({
          title: data.title,
          description: data.description,
          category: data.category,
          subcategory: data.subcategory || "",
          location: data.location,
          postal_code: data.postal_code || "",
          preferred_date: formattedDate,
          status: data.status,
        });
      } catch (error) {
        console.error("Error in fetch operation:", error);
        toast.error("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id, user, navigate, form]);

  const onSubmit = async (values: RequestFormValues) => {
    if (!id || !user) return;

    setSaving(true);
    try {
      // Format the date if it exists
      const formattedData = {
        ...values,
        preferred_date: values.preferred_date 
          ? new Date(values.preferred_date).toISOString() 
          : null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("service_requests")
        .update(formattedData)
        .eq("id", id);

      if (error) {
        toast.error("Erro ao atualizar solicitação");
        console.error("Error updating request:", error);
        return;
      }

      // Update the local state
      setRequest(prev => prev ? { ...prev, ...formattedData } : null);
      setIsEditing(false);
      toast.success("Solicitação atualizada com sucesso");
    } catch (error) {
      console.error("Error in update operation:", error);
      toast.error("Erro ao atualizar solicitação");
    } finally {
      setSaving(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div>Carregando solicitação...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Voltar para Dashboard
          </Button>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>Editar Solicitação</Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{request?.title}</CardTitle>
              {!isEditing && getStatusBadge(request?.status || "open")}
            </div>
            <p className="text-sm text-muted-foreground">
              Criado em {request?.created_at ? format(new Date(request.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : ""}
            </p>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título*</FormLabel>
                        <FormControl>
                          <Input placeholder="Título da solicitação" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição*</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Descreva o serviço necessário" {...field} className="min-h-[100px]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria*</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Encanamento" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subcategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subcategoria</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Vazamento" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Localização*</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: São Paulo, SP" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="postal_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CEP</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: 01234-567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="preferred_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data Preferencial</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <FormControl>
                            <select
                              className="w-full p-2 border rounded-md"
                              {...field}
                            >
                              <option value="open">Em aberto</option>
                              <option value="in_progress">Em andamento</option>
                              <option value="completed">Concluído</option>
                              <option value="cancelled">Cancelado</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={saving}>
                      {saving ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Descrição</h3>
                  <p className="mt-2">{request?.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium">Categoria</h3>
                    <p className="mt-2">{request?.category}</p>
                  </div>
                  
                  {request?.subcategory && (
                    <div>
                      <h3 className="text-lg font-medium">Subcategoria</h3>
                      <p className="mt-2">{request.subcategory}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium">Localização</h3>
                    <p className="mt-2">{request?.location}</p>
                  </div>
                  
                  {request?.postal_code && (
                    <div>
                      <h3 className="text-lg font-medium">CEP</h3>
                      <p className="mt-2">{request.postal_code}</p>
                    </div>
                  )}
                </div>

                {request?.preferred_date && (
                  <div>
                    <h3 className="text-lg font-medium">Data Preferencial</h3>
                    <p className="mt-2">
                      {format(new Date(request.preferred_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default RequestDetail;
