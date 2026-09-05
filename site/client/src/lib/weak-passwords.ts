/**
 * A local stand-in for Supabase's leaked-password check.
 *
 * That feature checks every new password against HaveIBeenPwned, and it is only
 * available on the paid plan. This is the free eighty per cent of it: the
 * passwords that actually get used. Every entry below appears near the top of
 * the published breach lists, and between them they account for a large share
 * of real-world choices — far more than any rule about symbols and capitals
 * ever catches.
 *
 * Deliberately not a network call: reaching HaveIBeenPwned from the browser
 * would mean opening `connect-src` in the CSP, and this catches the common case
 * without loosening anything.
 */
const COMMON = new Set([
  // the perennial top of every breach list
  "123456", "123456789", "12345678", "1234567890", "12345", "1234567", "111111",
  "123123", "000000", "654321", "666666", "1234", "121212", "112233", "159753",
  "password", "password1", "password123", "passw0rd", "p@ssw0rd", "pass1234",
  "qwerty", "qwerty123", "qwertyuiop", "1q2w3e4r", "1qaz2wsx", "zaq12wsx",
  "abc123", "abcd1234", "a1b2c3d4", "asdfghjkl", "asdf1234", "zxcvbnm",
  "iloveyou", "princess", "sunshine", "welcome", "welcome1", "monkey",
  "dragon", "letmein", "football", "baseball", "superman", "batman",
  "trustno1", "master", "shadow", "michael", "jennifer", "jordan",
  "hunter", "computer", "internet", "samsung", "google", "facebook",
  "whatever", "starwars", "freedom", "charlie", "michelle", "daniel",
  "admin", "administrator", "root", "guest", "test1234", "changeme",
  "secret", "login", "default", "temp1234", "demo1234",
  // common in Arabic-speaking regions, written in Latin script
  "ahmed", "mohamed", "mohammed", "muhammad", "ahmad", "mahmoud", "mostafa",
  "fatima", "aisha", "yehia", "yahya", "habibi", "salam", "allah", "islam",
  "egypt", "masr", "cairo", "alex", "ana123", "ahmed123", "mohamed123",
  "asdasd", "asd123", "qwe123", "zxc123", "123qwe", "123asd",
]);

/** Why a password was refused, or null when it is acceptable. */
export type PasswordProblem = "short" | "common" | "personal" | null;

/** Anything a determined guesser would try first: the name, the address. */
const looksPersonal = (password: string, email?: string, name?: string) => {
  const value = password.toLowerCase();
  const candidates = [
    email?.split("@")[0],
    email?.split("@")[1]?.split(".")[0],
    name,
  ];
  return candidates.some(candidate => {
    const c = candidate?.trim().toLowerCase();
    // Short fragments would reject far too much; three characters is not a clue.
    return !!c && c.length >= 4 && (value === c || value.startsWith(c) || value.endsWith(c));
  });
};

export function passwordProblem(
  password: string,
  { email, name, min = 8 }: { email?: string; name?: string; min?: number } = {},
): PasswordProblem {
  if (password.length < min) return "short";
  // Trailing digits are the usual way of "strengthening" a common word, and
  // they are the first thing a guesser strips, so strip them here too.
  const base = password.toLowerCase().replace(/[0-9]+$/, "");
  if (COMMON.has(password.toLowerCase()) || (base.length >= 4 && COMMON.has(base))) return "common";
  if (looksPersonal(password, email, name)) return "personal";
  return null;
}
