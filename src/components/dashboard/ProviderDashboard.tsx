
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceRequestMarketplace from "./ServiceRequestMarketplace";
import UnlockedContacts from "./UnlockedContacts";
import ProfileEditor from "./ProfileEditor";
import ProviderCredits from "./ProviderCredits";
import PortfolioManager from "./PortfolioManager";
import ProviderSpecialties from "./ProviderSpecialties";

const ProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState("oportunidades");

  return (
    <div>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-6 flex overflow-auto">
          <TabsTrigger value="oportunidades">Oportunidades</TabsTrigger>
          <TabsTrigger value="especialidades">Especialidades</TabsTrigger>
          <TabsTrigger value="contatos">Meus Contatos</TabsTrigger>
          <TabsTrigger value="portfolio">Meu Portfólio</TabsTrigger>
          <TabsTrigger value="creditos">Meus Créditos</TabsTrigger>
          <TabsTrigger value="perfil">Meu Perfil</TabsTrigger>
        </TabsList>

        <TabsContent value="oportunidades">
          <ServiceRequestMarketplace />
        </TabsContent>

        <TabsContent value="especialidades">
          <ProviderSpecialties />
        </TabsContent>

        <TabsContent value="contatos">
          <UnlockedContacts />
        </TabsContent>

        <TabsContent value="portfolio">
          <PortfolioManager />
        </TabsContent>

        <TabsContent value="creditos">
          <ProviderCredits />
        </TabsContent>

        <TabsContent value="perfil">
          <ProfileEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProviderDashboard;
