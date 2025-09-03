import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { CartProvider } from "./hooks/useCart";
import AppInitializer from "./components/AppInitializer";
import Index from "./pages/Index";
import BoxPage from "./pages/BoxPage";
import ProfessionalSaasPage from "./pages/ProfessionalSaasPage";
import BoutiquePage from "./pages/BoutiquePage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import CheckoutCancelPage from "./pages/CheckoutCancelPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";
import ConnexionPage from "./pages/ConnexionPage";
import DashboardPage from "./pages/DashboardPage";
import MoodDashboard from "./pages/MoodDashboard";
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import UserDashboard from "./pages/UserDashboard";
import EngagementsPage from "./pages/EngagementsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <AppInitializer>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/box" element={<BoxPage />} />
                <Route path="/saas" element={<ProfessionalSaasPage />} />
                <Route path="/boutique" element={<BoutiquePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
                <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />
                <Route path="/boutique/produit/:slug" element={<ProductDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/connexion" element={<ConnexionPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/mood" element={<MoodDashboard />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/engagements" element={<EngagementsPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AppInitializer>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;