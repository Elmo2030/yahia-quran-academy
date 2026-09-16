import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// The site is static: the Quran text, the audio and the timing data are all
// fetched directly from object storage by the client. There is no API tier,
// so there is no tRPC client, no query cache and no session to redirect on.
createRoot(document.getElementById("root")!).render(<App />);

// The service worker is what lets a family add the journey to a home screen and
// still open it on a train. It is registered only in a real build: in
// development it would serve yesterday's bundle back to us.
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // An unsupported or blocked worker changes nothing about the site.
    });
  });
}
