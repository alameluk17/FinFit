from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import TransactionSerializer, UserSerializer, GroupSerializer, PlayerSerializer, RegisterEndpointSerializer
from .models import Player, Transaction
from .permissions import IsAdminOrReadOnly, IsPlayerDepositorOrAdmin, IsReadOnly, IsPlayerOwnerOrAdmin

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class PlayerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows players to be viewed or edited.
    """
    # Apply appropriate permissions for each action
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsReadOnly]
        elif self.action in ['update', 'partial_update']:
            permission_classes = [IsPlayerOwnerOrAdmin]
        elif self.action in ['create', 'destroy']:
            permission_classes = [IsAdminOrReadOnly]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [permissions.IsAuthenticated]

class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterEndpointSerializer

class TransactionView(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    permission_classes = (IsPlayerDepositorOrAdmin,)
    serializer_class = TransactionSerializer
