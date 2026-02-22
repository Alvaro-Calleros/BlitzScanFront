import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Componente para proteger rutas — redirige a Clerk si no hay sesión
const RutaProtegida = ({ children }: { children: React.ReactNode }) => (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen bg-white">
        <BrowserRouter>
          <Routes>
            {/* Ruta pública — landing page */}
            <Route path="/" element={<Index />} />

            {/* Rutas protegidas — requieren sesión de Clerk */}
            {/* TODO: Reemplazar Navigate por los componentes nuevos cuando se construyan */}
            <Route
              path="/dashboard"
              element={
                <RutaProtegida>
                  <Navigate to="/" replace />
                </RutaProtegida>
              }
            />
            <Route
              path="/setup"
              element={
                <RutaProtegida>
                  <Navigate to="/" replace />
                </RutaProtegida>
              }
            />
            <Route
              path="/checklist/:id"
              element={
                <RutaProtegida>
                  <Navigate to="/" replace />
                </RutaProtegida>
              }
            />
            <Route
              path="/report/:id"
              element={
                <RutaProtegida>
                  <Navigate to="/" replace />
                </RutaProtegida>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
