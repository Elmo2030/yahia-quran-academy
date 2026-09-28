import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";
import { useLocale, type SiteLocale } from "@/contexts/LocaleContext";
import { reportError } from "@/lib/error-reporting";

interface Props {
  children: ReactNode;
  locale: SiteLocale;
  direction: "rtl" | "ltr";
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const copy = {
  ar: {
    title: "حصلت مشكلة مؤقتة",
    body: "جرّب تحديث الصفحة، وستعود رحلتك كما كانت.",
    retry: "تحديث الصفحة",
  },
  en: {
    title: "Something went wrong for a moment",
    body: "Try refreshing the page and your journey will be here again.",
    retry: "Refresh page",
  },
} as const;

class LocalizedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    reportError(error, "boundary");
  }

  render() {
    if (this.state.hasError) {
      const t = copy[this.props.locale];
      return (
        <main className="flex min-h-screen items-center justify-center bg-background p-8" dir={this.props.direction}>
          <div className="flex w-full max-w-md flex-col items-center rounded-2xl bg-card p-8 text-center shadow-sm" role="alert">
            <AlertTriangle
              size={48}
              className="mb-6 flex-shrink-0 text-destructive"
              aria-hidden="true"
            />

            <h1 className="mb-3 text-xl">{t.title}</h1>
            <p className="mb-6 text-sm leading-6 text-muted-foreground">{t.body}</p>

            <button
              onClick={() => window.location.reload()}
              className="flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
            >
              <RotateCcw size={16} aria-hidden="true" />
              {t.retry}
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default function ErrorBoundary({ children }: { children: ReactNode }) {
  const { locale, direction } = useLocale();
  return <LocalizedErrorBoundary locale={locale} direction={direction}>{children}</LocalizedErrorBoundary>;
}
