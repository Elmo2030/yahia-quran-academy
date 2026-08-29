// Re-export so pages can use both import styles:
//   import useAuth, { AuthError } from "@/hooks/useAuth"   (default + value)
//   import { useAuth } from "@/hooks/useAuth"              (named)
// AuthError is re-exported as a VALUE (class) so `err instanceof AuthError`
// type-narrows at runtime; a type-only re-export breaks that usage (TS1362).
export { useAuth, useAuth as default } from "@/contexts/AuthContext";
export { AuthError } from "@/contexts/AuthContext";
