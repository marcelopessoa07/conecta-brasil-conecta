
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import ServiceRequestList from "./ServiceRequestList";
import { PlusCircle } from "lucide-react";

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Área do Cliente</h2>
        <Button 
          onClick={() => navigate("/new-request")} 
          className="bg-primary hover:bg-primary/90"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Novo Pedido de Serviço
        </Button>
      </div>

      <Tabs defaultValue="requests" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="requests">Meus Pedidos</TabsTrigger>
          <TabsTrigger value="profile">Meu Perfil</TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meus Pedidos de Serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <ServiceRequestList />
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

export default ClientDashboard;
