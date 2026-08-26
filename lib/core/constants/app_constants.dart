abstract final class AppConstants {
  // ponytail: env vars via --dart-define at build time, no .env lib needed
  static const supabaseUrl = String.fromEnvironment(
    'SUPABASE_URL',
    defaultValue: 'https://rhcfcyvxgbltdzeezryw.supabase.co',
  );
  static const supabaseAnonKey = String.fromEnvironment(
    'SUPABASE_ANON_KEY',
    defaultValue: 'sb_publishable_bxaNMCh1oCmQBv5r82zHKw_LWln67d4',
  );
  static const aiEngineWsUrl = String.fromEnvironment(
    'AI_WS_URL',
    defaultValue: 'ws://localhost:8000/ws/recitation',
  );

  static const double cornerRadius = 24.0;
  static const double cornerRadiusSmall = 16.0;
  static const double cornerRadiusLarge = 24.0;
}
