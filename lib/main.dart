import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'core/constants/app_constants.dart';
import 'core/network/sync_engine.dart';
import 'core/routing/app_router.dart';
import 'core/theme/app_theme.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  try {
    await Supabase.initialize(
      url: AppConstants.supabaseUrl,
      publishableKey: AppConstants.supabaseAnonKey,
    );
  } catch (e) {
    debugPrint('Supabase init failed: $e — app will run in offline mode');
  }

  runApp(const ProviderScope(child: YahiaQuranApp()));
}

class YahiaQuranApp extends ConsumerWidget {
  const YahiaQuranApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(appRouterProvider);
    ref.watch(syncEngineProvider);

    return MaterialApp.router(
      title: AppConstants.academyName,
      theme: AppTheme.light,
      debugShowCheckedModeBanner: false,
      routerConfig: router,
      builder: (context, child) {
        // Wrap with splash overlay that fades out once router resolves
        return _SplashGate(child: child ?? const SizedBox.shrink());
      },
    );
  }
}

/// Brief cinematic splash that fades out after Supabase auth resolves.
class _SplashGate extends StatefulWidget {
  final Widget child;
  const _SplashGate({required this.child});

  @override
  State<_SplashGate> createState() => _SplashGateState();
}

class _SplashGateState extends State<_SplashGate> {
  bool _showSplash = true;

  @override
  void initState() {
    super.initState();
    // Hold splash for 1.2s to let auth state resolve, then fade out
    Future.delayed(const Duration(milliseconds: 1200), () {
      if (mounted) setState(() => _showSplash = false);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        widget.child,
        if (_showSplash)
          AnimatedOpacity(
            opacity: _showSplash ? 1.0 : 0.0,
            duration: const Duration(milliseconds: 400),
            child: Container(
              color: AppColors.ivory,
              child: Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Container(
                      width: 80,
                      height: 80,
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [
                            AppColors.olive.withValues(alpha: 0.12),
                            AppColors.gold.withValues(alpha: 0.18),
                          ],
                        ),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.menu_book_rounded,
                        size: 36,
                        color: AppColors.olive,
                      ),
                    ),
                    const SizedBox(height: 24),
                    const Text(
                      'Yahia',
                      style: TextStyle(
                        fontSize: 42,
                        fontWeight: FontWeight.w700,
                        fontFamily: 'Source Serif 4',
                        color: AppColors.navy,
                        letterSpacing: 6,
                        decoration: TextDecoration.none,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'QURAN ACADEMY',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        letterSpacing: 4,
                        color: AppColors.olive.withValues(alpha: 0.6),
                        decoration: TextDecoration.none,
                      ),
                    ),
                    const SizedBox(height: 36),
                    SizedBox(
                      width: 24,
                      height: 24,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: AppColors.olive.withValues(alpha: 0.5),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
      ],
    );
  }
}
