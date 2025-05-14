
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientDashboard from "@/components/dashboard/ClientDashboard";
import ProviderDashboard from "@/components/dashboard/ProviderDashboard";
import { toast } from "sonner";

const Dashboard = () => {
  const { user, loading, refreshProfile } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsInitialized(true);
    }
  }, [loading]);

  useEffect(() => {
    // Refresh profile on component mount to ensure we have the latest data
    if (user) {
      refreshProfile();
    }
  }, [refreshProfile, user]);

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

  // Redirect admin users to the admin dashboard
  if (user.profile?.user_type === "admin") {
    return <Navigate to="/admin" replace />;
  }
  
  // Make sure we're using the correct user type from the profile
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
