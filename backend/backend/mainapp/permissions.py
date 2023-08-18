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
    
class IsPlayerDepositorOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow read-only access for depositor or beneficiary
        if request.method in SAFE_METHODS and (obj.depositor == request.user or obj.beneficiary == request.user or request.user.is_staff):
            return True

        # Allow write access for player owner or admin
        return obj.depositor == request.user or request.user.is_staff

class IsPlayerOwnerOrAdminOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user or request.user.is_staff

class AssetEndpointNonAdminPermissions(BasePermission):
    """
    Custom permission to allow access only to the custom actions.
    """

    def has_permission(self, request, view):
        # Allow access to custom actions or listing only
        return (request.method in SAFE_METHODS or view.action in ['purchase', 'sale'])