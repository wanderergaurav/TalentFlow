import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "./components";
import { Home, Jobs, Candidates, Assessments, JobDescription, CandidateDescription } from "./pages";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/jobs/:id" component={JobDescription} />
      <Route path="/assessments" component={Assessments} />
      <Route path="/candidates" component={Candidates} />
      <Route path="/candidates/:id" component={CandidateDescription} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="talentflow-ui-theme">
        <TooltipProvider>
          <div className="min-h-screen">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Router />
            </main>
            <Toaster />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
