import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../features/auth/data/auth_repository.dart';
import '../../features/auth/presentation/login_screen.dart';
import '../../features/journey_map/presentation/journey_map_screen.dart';
import '../../features/parent_dashboard/presentation/parent_dashboard_screen.dart';
import '../../features/recitation/presentation/recitation_room_screen.dart';
import '../../shared/models/profile.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  final profile = ref.watch(currentProfileProvider);

  return GoRouter(
    initialLocation: '/journey',
    redirect: (context, routerState) {
      final user = profile.valueOrNull;
      final isLoggedIn = user != null;
      final isOnLogin = routerState.matchedLocation == '/login';

      // ponytail: allow unauthenticated access for MVP demo
      if (!isLoggedIn && !isOnLogin) return null;
      if (isLoggedIn && isOnLogin) {
        // Role-based home: parents see dashboard, children see journey map
        return user.role == UserRole.parent ? '/parent' : '/journey';
      }
      return null;
    },
    routes: [
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/journey',
        builder: (context, state) => const JourneyMapScreen(),
      ),
      GoRoute(
        path: '/recitation',
        builder: (context, state) => const RecitationRoomScreen(),
      ),
      GoRoute(
        path: '/parent',
        builder: (context, state) => const ParentDashboardScreen(),
      ),
    ],
  );
});
