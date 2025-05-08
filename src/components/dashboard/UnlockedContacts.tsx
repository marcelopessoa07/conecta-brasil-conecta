
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Phone, Mail, User } from "lucide-react";

type UnlockedContact = {
  id: string;
  request: {
    id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    created_at: string;
    client: {
      id: string;
      name: string;
      email: string;
      phone: string | null;
    };
  };
  unlocked_at: string;
};

const UnlockedContacts = () => {
  const [contacts, setContacts] = useState<UnlockedContact[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUnlockedContacts = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from("contact_unlocks")
          .select(`
            id, 
            unlocked_at,
            request_id,
            request:service_requests (
              id, 
              title, 
              description, 
              category, 
              location,
              created_at,
              client_id,
              client:profiles!client_id (
                id, 
                name, 
                email, 
                phone
              )
            )
          `)
          .eq("provider_id", user.id)
          .order("unlocked_at", { ascending: false });

        if (error) {
          console.error("Error fetching unlocked contacts:", error);
          return;
        }

        setContacts(data as unknown as UnlockedContact[]);
      } catch (error) {
        console.error("Error in fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnlockedContacts();
  }, [user?.id]);

  if (loading) {
    return <div>Carregando contatos...</div>;
  }

  if (contacts.length === 0) {
    return (
      <div className="text-center py-8">
        <p>Você ainda não desbloqueou nenhum contato.</p>
        <p className="text-sm text-muted-foreground mt-2">
          Explore o marketplace para encontrar oportunidades e desbloquear contatos de clientes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <Card key={contact.id}>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{contact.request.title}</h3>
                <div className="text-sm text-gray-500 mb-2">
                  <span className="mr-2">
                    {format(new Date(contact.request.created_at), "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                  <span>·</span>
                  <span className="ml-2">{contact.request.location}</span>
                </div>
                <div className="mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {contact.request.category}
                  </span>
                  <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Desbloqueado em {format(new Date(contact.unlocked_at), "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 line-clamp-2">{contact.request.description}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mt-4 md:mt-0 md:ml-4 md:w-64">
                <h4 className="font-medium mb-2 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {contact.request.client?.name || "Cliente"}
                </h4>
                <div className="space-y-2">
                  {contact.request.client?.email && (
                    <p className="text-sm flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      <a href={`mailto:${contact.request.client.email}`} className="text-blue-600 hover:underline">
                        {contact.request.client.email}
                      </a>
                    </p>
                  )}
                  {contact.request.client?.phone && (
                    <p className="text-sm flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <a href={`tel:${contact.request.client.phone}`} className="text-blue-600 hover:underline">
                        {contact.request.client.phone}
                      </a>
                    </p>
                  )}
                  <Button className="w-full mt-2" variant="outline" size="sm">
                    Marcar como Concluído
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UnlockedContacts;
