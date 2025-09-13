import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { LanguageProvider } from "./hooks/useLanguage";
import { CartProvider } from "./hooks/useCart";
import AppInitializer from "./components/AppInitializer";
import GlobalSEO from "./components/GlobalSEO";
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
import CMSLayout from "./components/cms/CMSLayout";
import CMSIndexPage from "./pages/cms/CMSIndexPage";
import ProductsPage from "./pages/cms/ProductsPage";
import ProductFormPage from "./pages/cms/ProductFormPage";
import ImagesPage from "./pages/cms/ImagesPage";
import SettingsPage from "./pages/cms/SettingsPage";
import CMSPartnersPage from "./pages/cms/PartnersPage";
import MediaPage from "./pages/cms/MediaPage";
import AuthPage from "./pages/AuthPage";
import LoginPage from "./pages/auth/LoginPage";
import AuthCallbackPage from "./pages/auth/AuthCallbackPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import LogoutPage from "./pages/auth/LogoutPage";
import SimulateurPage from "./pages/SimulateurPage";
import UserDashboard from "./pages/UserDashboard";
import EngagementsPage from "./pages/EngagementsPage";
import PartnersPage from "./pages/PartnersPage";
import NotFound from "./pages/NotFound";
import MentionsLegalesPage from "./pages/MentionsLegalesPage";
import PolitiqueConfidentialitePage from "./pages/PolitiqueConfidentialitePage";
import CGVPage from "./pages/CGVPage";
import MobilePage from "./pages/MobilePage";
import AboutPage from "./pages/AboutPage";
import InternationalPage from "./pages/InternationalPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
          <AppInitializer>
            <GlobalSEO />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/box" element={<BoxPage />} />
                <Route path="/saas" element={<ProfessionalSaasPage />} />
                <Route path="/international" element={<InternationalPage />} />
                <Route path="/boutique" element={<BoutiquePage />} />
                <Route path="/mobile" element={<MobilePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
                <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />
                <Route path="/boutique/produit/:slug" element={<ProductDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/connexion" element={<ConnexionPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/mood" element={<MoodDashboard />} />
                <Route path="/admin" element={<AdminPage />} />
                
                {/* CMS Routes */}
                <Route path="/cms" element={<CMSLayout><CMSIndexPage /></CMSLayout>} />
                <Route path="/cms/products" element={<CMSLayout><ProductsPage /></CMSLayout>} />
                <Route path="/cms/products/new" element={<CMSLayout><ProductFormPage /></CMSLayout>} />
                <Route path="/cms/products/edit/:id" element={<CMSLayout><ProductFormPage /></CMSLayout>} />
                <Route path="/cms/images" element={<CMSLayout><ImagesPage /></CMSLayout>} />
                <Route path="/cms/partners/applications" element={<CMSLayout><CMSPartnersPage /></CMSLayout>} />
                <Route path="/cms/partners/approved" element={<CMSLayout><CMSPartnersPage /></CMSLayout>} />
                <Route path="/cms/media" element={<CMSLayout><MediaPage /></CMSLayout>} />
                <Route path="/cms/settings" element={<CMSLayout><SettingsPage /></CMSLayout>} />
                
                {/* Auth Routes */}
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/callback" element={<AuthCallbackPage />} />
                <Route path="/auth/logout" element={<LogoutPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/simulateur" element={<SimulateurPage />} />
                
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/engagements" element={<EngagementsPage />} />
                <Route path="/partenaires" element={<PartnersPage />} />
                <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
                <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
                <Route path="/cgv" element={<CGVPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AppInitializer>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
