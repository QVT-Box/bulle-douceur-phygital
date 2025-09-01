import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { CartProvider } from "./hooks/useCart";
import Index from "./pages/Index";
import BoxPage from "./pages/BoxPage";
import SaasPage from "./pages/SaasPage";
import BoutiquePage from "./pages/BoutiquePage";
import ContactPage from "./pages/ContactPage";
import ConnexionPage from "./pages/ConnexionPage";
import DashboardPage from "./pages/DashboardPage";
import MoodDashboard from "./pages/MoodDashboard";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/box" element={<BoxPage />} />
              <Route path="/saas" element={<SaasPage />} />
              <Route path="/boutique" element={<BoutiquePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/connexion" element={<ConnexionPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/mood" element={<MoodDashboard />} />
              <Route path="/admin" element={<AdminPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
