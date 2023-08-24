from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import FixedDeposit, Player, Transaction, Asset, FixedDepositType
from . import GAME_CONSTANTS


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
        fields = ['user','gender','wallet_balance','account_location','account_balance','monthly_expenses','monthly_salary','government_id','net_worth','kindness_index','happiness_index']

class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    # We reiterate what a user is once more here so that drf knows what to hyperlink (I think)
    #user = serializers.HyperlinkedRelatedField(view_name='user-detail',queryset=User.objects.all())
     # Create a custom method field
    current_user = serializers.SerializerMethodField('_user')

    # Use this method for the custom field
    def _user(self, obj):
        request = self.context.get('request', None)
        if request:
            return request.user.id
   
    class Meta:
        model = Transaction
        fields = ['beneficiary','amount','purpose','current_user']

    def validate(self, attrs):
        validation_errors = {}
        
        # make sure beneficiary is an existing player
        
        #dep = attrs["depositor"] #depositor is always the logged in user
        dep = Player.objects.get(user = self._user(None))
        acc_bal = dep.account_balance
        if(attrs['amount'] <= 0):
            validation_errors['neg_amount'] = f"Withdrawal Amount {attrs['amount']} is invalid"
        if(acc_bal < attrs['amount']): 
            validation_errors["amount"] = f"Withdrawal amount {attrs['amount']} is greater than account balance {acc_bal}"
        if validation_errors:
            raise serializers.ValidationError(validation_errors)
        return attrs
        
    def create(self, validated_data):
        transaction = Transaction.objects.create(
            depositor=Player.objects.get(user = self._user(None)),
            beneficiary=validated_data['beneficiary'],
            amount=validated_data['amount'],
            purpose=validated_data['purpose']
        )
        transaction.save() 
        

        return transaction
class FixedDepositTypeSerialiser(serializers.ModelSerializer):
    class Meta:
        model = FixedDepositType
        fields = "__all__"

class FixedDepositSerialiser(serializers.ModelSerializer):
    current_user = serializers.SerializerMethodField('_user')

    # Use this method for the custom field
    def _user(self, obj):
        request = self.context.get('request', None)
        if request:
            return request.user.id
   
    class Meta:
        model = FixedDeposit
        fields = ['principal','fixed_deposit_type','current_user','owner']
        read_only_fields = ['owner']

    def validate(self, attrs):
        validation_errors = {}
        
        owner = Player.objects.get(user = self._user(None))
        acc_bal = owner.account_balance

        if(attrs['principal'] <= 0):
            validation_errors['neg_principal'] = f"Cannot have an Fixed Deposit with Principal {attrs['principal']}."
        if(acc_bal < attrs['principal']): 
            validation_errors["principal"] = f"FD principal {attrs['principal']} is greater than account balance {acc_bal}"
        if attrs["fixed_deposit_type"].restricted_to_gender and owner.gender!=attrs["fixed_deposit_type"].restricted_to_gender:
            validation_errors["gender"] = f"The FD scheme {attrs['fixed_deposit_type']} is not open to your gender."
        if validation_errors:
            raise serializers.ValidationError(validation_errors)
        return attrs
        
    def create(self, validated_data):
        player = Player.objects.get(user = self._user(None))
        fixed_deposit = FixedDeposit.objects.create(
            owner=player,
            principal=validated_data['principal'],
            fixed_deposit_type = validated_data['fixed_deposit_type']
        )
        fixed_deposit.save()
        return fixed_deposit

class RegisterEndpointSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('id','username', 'password', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if not attrs['first_name']:
            raise serializers.ValidationError({"first_name": "First name cannot be empty!"})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class AssetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Asset
        fields = "__all__"
        read_only_fields = ["asset_type","start_date","buying_price","value"]
    def validate(self, data):
        request = self.context['request']
        action = self.context['view'].action
        validation_errors = {}
        if action == 'purchase':
            if not data['up_for_sale']:
                validation_errors["not_for_sale"] = "This asset is not for sale."
            if data['owner'] != Player.objects.get(user = request.user):
                validation_errors["not_owner"] = "You can't buy this asset for someone else."
        elif action == 'sale':
            if data['owner'] !=  Player.objects.get(user = request.user):
                validation_errors["not_owner"] = "You don't own this asset."
        if validation_errors:
            raise serializers.ValidationError(validation_errors)
        return data