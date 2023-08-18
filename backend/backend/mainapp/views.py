from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import viewsets,status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import TransactionSerializer, UserSerializer, GroupSerializer, PlayerSerializer, RegisterEndpointSerializer,FixedDepositSerialiser,AssetSerializer
from .models import FixedDeposit, Player, Transaction, Asset
from .permissions import IsAdminOrReadOnly, IsPlayerDepositorOrAdmin, IsReadOnly, IsPlayerOwnerOrAdmin, AssetEndpointNonAdminPermissions

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
    def get_permissions(self):
        permission_classes = [IsPlayerDepositorOrAdmin,permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
    queryset = Transaction.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TransactionSerializer


class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer

    def get_permissions(self):
        permission_classes = [permissions.IsAuthenticated]
        if self.action in ['create','destroy']:
            permission_classes += [IsAdminOrReadOnly]
        else:
            permission_classes += [AssetEndpointNonAdminPermissions]
        return [permission() for permission in permission_classes]
    
    def update(self, request, *args, **kwargs):
        return Response({'message': 'Updates to assets are not allowed.'}, status=status.HTTP_403_FORBIDDEN)

    @action(detail=True, methods=['post'])
    def purchase(self, request, pk=None):
        instance = self.get_object()
        if instance.up_for_sale and instance.owner != Player.objects.get(user = request.user):
            instance.owner = Player.objects.get(user = request.user)
            instance.up_for_sale = False
            instance.save()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        return Response({'message': 'Asset cannot be purchased.'}, status=status.HTTP_400_BAD_REQUEST)
    @action(detail=True, methods=['post'])
    def sale(self, request, pk=None):
        instance = self.get_object()

        if instance.owner == Player.objects.get(user = request.user) and not instance.up_for_sale:
            instance.up_for_sale = True
            instance.save()
            return Response({'message': 'Asset put up for sale successfully.'})
        else:
            return Response({'message': 'Asset cannot be put up for sale.'}, status=status.HTTP_400_BAD_REQUEST)

class FixedDepositViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Fixed Deposits to be viewed or edited.
    """
    # Apply appropriate permissions for each action
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsReadOnly]
        elif self.action in ['update', 'partial_update','destroy']:
            permission_classes = [IsAdminOrReadOnly]
        elif self.action in ['create']:
            permission_classes = [IsPlayerOwnerOrAdmin]
        else:
            permission_classes = []
        permission_classes += [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
    queryset = FixedDeposit.objects.all()
    serializer_class = FixedDepositSerialiser