from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class IsPlayerOwnerOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow read-only access for anyone
        if request.method in SAFE_METHODS:
            return True

        # Allow write access for player owner or admin
        return obj.user == request.user or request.user.is_staff

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # Allow read-only access for anyone
        if request.method in SAFE_METHODS:
            return True

        # Allow write access for admin
        return request.user.is_staff
