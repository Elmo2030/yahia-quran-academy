enum UserRole { child, parent, teacher }

class Profile {
  final String id;
  final String? authUserId;
  final UserRole role;
  final String? parentId;
  final String displayName;
  final DateTime createdAt;

  const Profile({
    required this.id,
    this.authUserId,
    required this.role,
    this.parentId,
    required this.displayName,
    required this.createdAt,
  });

  factory Profile.fromJson(Map<String, dynamic> json) => Profile(
        id: json['id'] as String,
        authUserId: json['auth_user_id'] as String?,
        role: UserRole.values.byName(json['role'] as String),
        parentId: json['parent_id'] as String?,
        displayName: json['display_name'] as String,
        createdAt: DateTime.parse(json['created_at'] as String),
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'auth_user_id': authUserId,
        'role': role.name,
        'parent_id': parentId,
        'display_name': displayName,
      };
}
