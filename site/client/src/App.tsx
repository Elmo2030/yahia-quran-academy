import { Suspense } from "react";
import { lazyWithRetry } from "@/lib/lazyWithRetry";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { PageMeta } from "@/components/PageMeta";
import ErrorBoundary from "./components/ErrorBoundary";
import { LocaleProvider } from "./contexts/LocaleContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";

// Everything except the landing page loads on demand. The whole site used to
// arrive in one 943 KB file, so a visitor reading the home page also paid for
// the reader, every story, and the Supabase client they may never touch.
const Stories = lazyWithRetry(() => import("@/pages/Stories"));
const Seerah = lazyWithRetry(() => import("@/pages/Seerah"));
const Reader = lazyWithRetry(() => import("./pages/Reader"));
const Login = lazyWithRetry(() => import("./pages/Login"));
const Register = lazyWithRetry(() => import("./pages/Register"));
const ForgotPassword = lazyWithRetry(() => import("./pages/ForgotPassword"));
const ResetPassword = lazyWithRetry(() => import("./pages/ResetPassword"));
const Profile = lazyWithRetry(() => import("./pages/Profile"));
const About = lazyWithRetry(() => import("./pages/About"));
const Privacy = lazyWithRetry(() => import("./pages/Privacy"));
const Terms = lazyWithRetry(() => import("./pages/Terms"));

/** Shown only while a route chunk is in flight. Deliberately quiet: a spinner
 *  that flashes for 80ms is worse than a blank moment. */
function RouteFallback() {
  return <div style={{ minHeight: "60vh" }} aria-busy="true" />;
}

function Router() {
  return (
    <Suspense fallback={<RouteFallback />}>
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/read"} component={Reader} />
      <Route path={"/read/:surah"} component={Reader} />
      <Route path={"/stories"} component={Stories} />
      <Route path={"/stories/:chapter"} component={Stories} />
      <Route path={"/stories/:chapter/:slug"} component={Stories} />
      <Route path={"/seerah"} component={Seerah} />
      <Route path={"/seerah/:slug"} component={Seerah} />
      <Route path={"/login"} component={Login} />
      <Route path={"/register"} component={Register} />
      <Route path={"/forgot-password"} component={ForgotPassword} />
      <Route path={"/reset-password"} component={ResetPassword} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/about"} component={About} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LocaleProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <PageMeta />
              <Router />
            </TooltipProvider>
          </AuthProvider>
        </LocaleProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
