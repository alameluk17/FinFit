from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import viewsets,status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import TransactionSerializer, UserSerializer, GroupSerializer, PlayerSerializer, RegisterEndpointSerializer,FixedDepositSerialiser,AssetSerializer, FixedDepositTypeSerialiser
from .models import FixedDeposit, Player, Transaction, Asset, FixedDepositType
from .permissions import IsAdminOrReadOnly, IsPlayerDepositorOrAdmin, IsReadOnly, IsPlayerOwnerOrAdmin, AssetEndpointNonAdminPermissions, IsPlayerOwnerOrAdminOnly

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
    """
    To purchase an asset as a user, simply send a post request to /asset/assetid/purchase
    To put up or remove an asset from sale, send a post request to /asset/assetid/sale with the appropriate 'up_for_sale' parameter set.
    """
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
        validation_errors = {}
        if not instance.up_for_sale:
            validation_errors["not_for_sale"] = f"This asset is not for sale."
        if instance.owner == Player.objects.get(user = request.user):
            validation_errors["already_owned"] = f"This asset is already yours!"
        if validation_errors:
            return Response(validation_errors, status=status.HTTP_400_BAD_REQUEST)
        instance.owner = Player.objects.get(user = request.user)
        instance.up_for_sale = False
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    @action(detail=True, methods=['post'])
    def sale(self, request, pk=None):
        instance = self.get_object()
        if "up_for_sale" in request.data and request.data['up_for_sale'] == True:
            up_for_sale = True
        else:
            up_for_sale = False
        validation_errors = {}
        if instance.owner != Player.objects.get(user = request.user):
            validation_errors["not_players"] = f"You do not own this asset"
        if validation_errors:
            return Response(validation_errors, status=status.HTTP_400_BAD_REQUEST)
        instance.up_for_sale = up_for_sale
        instance.save()
        return Response({'message': f'Asset {"put up for" if up_for_sale else "removed from"} sale successfully.'})

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
            permission_classes = [IsPlayerOwnerOrAdminOnly]
        else:
            permission_classes = []
        permission_classes += [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
    queryset = FixedDeposit.objects.all()
    serializer_class = FixedDepositSerialiser

class DepositTypeViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        permission_classes = [IsReadOnly]
        return [permission() for permission in permission_classes]
    queryset = FixedDepositType.objects.all() 
    serializer_class = FixedDepositTypeSerialiser