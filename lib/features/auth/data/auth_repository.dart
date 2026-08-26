import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../../../core/services/supabase/supabase_service.dart';
import '../../../shared/models/profile.dart';

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return AuthRepository(ref.watch(supabaseProvider));
});

/// Current authenticated profile — null when logged out.
/// Auto-refreshes on auth state changes.
final currentProfileProvider = StreamProvider<Profile?>((ref) {
  final repo = ref.watch(authRepositoryProvider);
  return repo.profileStream();
});

/// Convenience: current user's role.
final userRoleProvider = Provider<UserRole?>((ref) {
  return ref.watch(currentProfileProvider).valueOrNull?.role;
});

class AuthRepository {
  final SupabaseClient _client;

  AuthRepository(this._client);

  User? get currentUser => _client.auth.currentUser;
  bool get isAuthenticated => currentUser != null;

  /// Sign up with email/password.
  /// The DB trigger auto-creates a profile row with role='parent'.
  Future<AuthResponse> signUp({
    required String email,
    required String password,
    required String displayName,
  }) async {
    return _client.auth.signUp(
      email: email,
      password: password,
      data: {'full_name': displayName},
    );
  }

  /// Sign in with email/password.
  Future<AuthResponse> signIn({
    required String email,
    required String password,
  }) async {
    return _client.auth.signInWithPassword(
      email: email,
      password: password,
    );
  }

  Future<void> signOut() async {
    await _client.auth.signOut();
  }

  /// Fetch the profile for the current authenticated user.
  Future<Profile?> fetchCurrentProfile() async {
    final user = currentUser;
    if (user == null) return null;

    final data = await _client
        .from('profiles')
        .select()
        .eq('auth_user_id', user.id)
        .maybeSingle();

    if (data == null) return null;
    return Profile.fromJson(data);
  }

  /// Add a child profile linked to the current parent.
  Future<Profile> addChildProfile({
    required String displayName,
  }) async {
    final parent = await fetchCurrentProfile();
    if (parent == null) throw StateError('Not authenticated');
    if (parent.role != UserRole.parent) {
      throw StateError('Only parents can add children');
    }

    final data = await _client.from('profiles').insert({
      'auth_user_id': currentUser!.id,
      'role': 'child',
      'parent_id': parent.id,
      'display_name': displayName,
    }).select().single();

    return Profile.fromJson(data);
  }

  /// Fetch all child profiles linked to the current parent.
  Future<List<Profile>> fetchChildProfiles() async {
    final parent = await fetchCurrentProfile();
    if (parent == null) return [];

    final data = await _client
        .from('profiles')
        .select()
        .eq('parent_id', parent.id);

    return (data as List).map((e) => Profile.fromJson(e)).toList();
  }

  /// Stream that emits the current profile on auth state changes.
  Stream<Profile?> profileStream() {
    return _client.auth.onAuthStateChange.asyncMap((event) async {
      if (event.session == null) return null;
      return fetchCurrentProfile();
    });
  }
}
