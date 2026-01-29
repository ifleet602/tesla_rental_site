import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Fleet from "./pages/Fleet";
import BookTesla from "./pages/BookTesla";
import FranchiseOpportunities from "./pages/FranchiseOpportunities";
import FindTerritory from "./pages/FindTerritory";
import ApplyNow from "./pages/ApplyNow";
import HowItWorks from "./pages/HowItWorks";
import BookingSuccess from "./pages/BookingSuccess";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/fleet" component={Fleet} />
      <Route path="/book" component={BookTesla} />
      <Route path="/franchise" component={FranchiseOpportunities} />
      <Route path="/territory" component={FindTerritory} />
      <Route path="/apply" component={ApplyNow} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/booking-success" component={BookingSuccess} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
