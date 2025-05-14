
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NewRequest from "./pages/NewRequest";
import RequestDetail from "./pages/RequestDetail";
import AllCategories from "./pages/AllCategories";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import ProviderProfile from "./pages/ProviderProfile";
import ProviderPortfolio from "./pages/ProviderPortfolio";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-request" element={<NewRequest />} />
            <Route path="/request/:id" element={<RequestDetail />} />
            <Route path="/categorias" element={<AllCategories />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/provider/:id" element={<ProviderProfile />} />
            <Route path="/portfolio/:id" element={<ProviderPortfolio />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
