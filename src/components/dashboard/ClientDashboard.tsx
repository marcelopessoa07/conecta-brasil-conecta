
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceRequestList from "./ServiceRequestList";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import ProfileEditor from "./ProfileEditor";

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Área do Cliente</h2>
        <Link to="/new-request">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Nova Solicitação
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="requests" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="requests">Minhas Solicitações</TabsTrigger>
          <TabsTrigger value="profile">Meu Perfil</TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Solicitações de Serviço</CardTitle>
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
              <ProfileEditor />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDashboard;
