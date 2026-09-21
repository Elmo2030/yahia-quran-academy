import { Suspense } from "react";
import { lazyWithRetry } from "@/lib/lazyWithRetry";
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
const Aqeedah = lazyWithRetry(() => import("@/pages/Aqeedah"));
const Companions = lazyWithRetry(() => import("@/pages/Companions"));
const Login = lazyWithRetry(() => import("./pages/Login"));
const Register = lazyWithRetry(() => import("./pages/Register"));
const ForgotPassword = lazyWithRetry(() => import("./pages/ForgotPassword"));
const ResetPassword = lazyWithRetry(() => import("./pages/ResetPassword"));
const Profile = lazyWithRetry(() => import("./pages/Profile"));
const About = lazyWithRetry(() => import("./pages/About"));
const QuranFacts = lazyWithRetry(() => import("./pages/QuranFacts"));
const QuranFact = lazyWithRetry(() => import("./pages/QuranFact"));
const Privacy = lazyWithRetry(() => import("./pages/Privacy"));
const Terms = lazyWithRetry(() => import("./pages/Terms"));
const Hifz = lazyWithRetry(() => import("./pages/Hifz"));
const HifzSurah = lazyWithRetry(() => import("./pages/HifzSurah"));
const HifzRecite = lazyWithRetry(() => import("./pages/HifzRecite"));
const HifzReview = lazyWithRetry(() => import("./pages/HifzReview"));
const HifzParent = lazyWithRetry(() => import("./pages/HifzParent"));
const HifzCertificate = lazyWithRetry(() => import("./pages/HifzCertificate"));
const HifzLooks = lazyWithRetry(() => import("./pages/HifzLooks"));
const Journey = lazyWithRetry(() => import("./pages/Journey"));
const Listen = lazyWithRetry(() => import("./pages/Listen"));
const ListenSurah = lazyWithRetry(() => import("./pages/ListenSurah"));

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
      <Route path={"/listen"} component={Listen} />
      <Route path={"/listen/:surah"} component={ListenSurah} />
      <Route path={"/stories"} component={Stories} />
      <Route path={"/stories/:chapter"} component={Stories} />
      <Route path={"/stories/:chapter/:slug"} component={Stories} />
      <Route path={"/seerah"} component={Seerah} />
      <Route path={"/seerah/:slug"} component={Seerah} />
      <Route path={"/aqeedah"} component={Aqeedah} />
      <Route path={"/aqeedah/:slug"} component={Aqeedah} />
      <Route path={"/companions"} component={Companions} />
      <Route path={"/companions/:slug"} component={Companions} />
      <Route path={"/login"} component={Login} />
      <Route path={"/register"} component={Register} />
      <Route path={"/forgot-password"} component={ForgotPassword} />
      <Route path={"/reset-password"} component={ResetPassword} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/about"} component={About} />
      <Route path={"/quran-facts"} component={QuranFacts} />
      <Route path={"/quran-facts/:slug"} component={QuranFact} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/hifz"} component={Hifz} />
      <Route path={"/hifz/review"} component={HifzReview} />
      <Route path={"/hifz/parent"} component={HifzParent} />
      <Route path={"/hifz/certificate"} component={HifzCertificate} />
      <Route path={"/hifz/looks"} component={HifzLooks} />
      <Route path={"/journey"} component={Journey} />
      <Route path={"/hifz/:surah/recite"} component={HifzRecite} />
      <Route path={"/hifz/:surah"} component={HifzSurah} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <ErrorBoundary>
            <PageMeta />
            <Router />
          </ErrorBoundary>
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
