import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CasesPage from "./pages/CasesPage";
import CaseDetailsPage from "./pages/CaseDetailsPage";
import ThankYouPage from "./pages/ThankYouPage";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ChatbotsPage from "./pages/ChatbotsPage";
import ContactPage from "./pages/ContactPage";
import CrmPage from "./pages/CrmPage";
import WebAppDevelopmentPage from "./pages/WebAppDevelopmentPage";
import WebDevelopmentPage from "./pages/WebDevelopmentPage";
import WebsiteCostPage from "./pages/WebsiteCostPage";
import { ScrollToTop } from "./components/ScrollToTop";
import { CookieConsentBanner } from "./components/CookieConsentBanner";

import { ThemeProvider } from "@/components/theme-provider";
import { CalculatorProvider } from "@/contexts/CalculatorContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CalculatorProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cases" element={<CasesPage />} />
              <Route path="/cases/:id" element={<CaseDetailsPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/crm" element={<CrmPage />} />
              <Route path="/chatbots" element={<ChatbotsPage />} />
              <Route path="/web-development" element={<WebDevelopmentPage />} />
              <Route path="/web-app-development" element={<WebAppDevelopmentPage />} />
              <Route path="/website-cost" element={<WebsiteCostPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CookieConsentBanner />
          </BrowserRouter>
        </TooltipProvider>
      </CalculatorProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
