// Runs before the stylesheet paints. This stays in a same-origin file so the
// production CSP can forbid inline scripts without a theme flash.
try {
  const theme = localStorage.getItem("yahya-site-theme");
  if (theme === "dark" || theme === "light") {
    document.documentElement.setAttribute("data-theme", theme);
  }
} catch {
  // Storage can be unavailable in private browsing; system theme still works.
}
