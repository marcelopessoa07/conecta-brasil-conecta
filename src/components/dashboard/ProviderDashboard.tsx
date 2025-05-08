
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceRequestMarketplace from "./ServiceRequestMarketplace";
import ProviderCredits from "./ProviderCredits";

const ProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState("marketplace");

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Área do Prestador de Serviços</h2>
        <ProviderCredits />
      </div>

      <Tabs defaultValue="marketplace" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="marketplace">Oportunidades</TabsTrigger>
          <TabsTrigger value="unlocks">Contatos Desbloqueados</TabsTrigger>
          <TabsTrigger value="profile">Meu Perfil</TabsTrigger>
        </TabsList>
        
        <TabsContent value="marketplace" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Oportunidades de Serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <ServiceRequestMarketplace />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="unlocks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contatos Desbloqueados</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lista de contatos de clientes que você desbloqueou (em desenvolvimento)</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Área para gerenciar informações do perfil (em desenvolvimento)</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProviderDashboard;
