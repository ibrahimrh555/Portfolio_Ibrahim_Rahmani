import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import PostDetail from "./pages/PostDetail";
import ProjectDetail from "./pages/ProjectDetail";
import RouteSeo from "@/components/RouteSeo";
import SkipLink from "@/components/SkipLink";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <SkipLink />
        <RouteSeo />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/posts/:slug" element={<PostDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
