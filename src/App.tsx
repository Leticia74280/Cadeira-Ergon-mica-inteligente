import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/Login"; // novo componente de login
import MainInterface from "./components/MainInterface"; // novo componente com as rotas

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isAuthenticated ? (
          <MainInterface />
        ) : (
          <Login onLogin={() => setIsAuthenticated(true)} />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
