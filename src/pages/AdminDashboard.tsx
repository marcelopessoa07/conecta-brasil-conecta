
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AdminCategoriesManager from "@/components/admin/AdminCategoriesManager";
import AdminUsersManager from "@/components/admin/AdminUsersManager";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeTab, setActiveTab] = useState("usuarios");

  useEffect(() => {
    if (!loading) {
      setIsInitialized(true);
    }
  }, [loading]);

  if (!isInitialized) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!user || user.profile?.user_type !== "admin") {
    toast.error("Acesso restrito. Você não possui permissão de administrador.");
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="usuarios">Gerenciar Usuários</TabsTrigger>
            <TabsTrigger value="categorias">Gerenciar Categorias</TabsTrigger>
          </TabsList>

          <TabsContent value="usuarios">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <AdminUsersManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categorias">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Categorias</CardTitle>
              </CardHeader>
              <CardContent>
                <AdminCategoriesManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
