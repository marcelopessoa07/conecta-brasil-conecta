
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientDashboard from "@/components/dashboard/ClientDashboard";
import ProviderDashboard from "@/components/dashboard/ProviderDashboard";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsInitialized(true);
    }
  }, [loading]);

  useEffect(() => {
    if (user?.profile) {
      console.log("Dashboard user type:", user.profile.user_type);
    }
  }, [user]);

  if (!isInitialized) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const userType = user.profile?.user_type || "client";
  
  console.log("Rendering dashboard for user type:", userType);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Olá, {user.profile?.name || "Usuário"}</h1>
        
        {userType === "professional" ? (
          <ProviderDashboard />
        ) : (
          <ClientDashboard />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
