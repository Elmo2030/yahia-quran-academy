import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// The site is static: the Quran text, the audio and the timing data are all
// fetched directly from object storage by the client. There is no API tier,
// so there is no tRPC client, no query cache and no session to redirect on.
createRoot(document.getElementById("root")!).render(<App />);
