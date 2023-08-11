from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Player


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id','url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class PlayerSerializer(serializers.HyperlinkedModelSerializer):
    # We reiterate what a user is once more here so that drf knows what to hyperlink (I think)
    user = serializers.HyperlinkedRelatedField(view_name='user-detail',queryset=User.objects.all())
    class Meta:
        model = Player
        fields = ['user','account_location','account_balance','monthly_expenses','monthly_salary','government_id','net_worth','kindness_index']