from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import Player, Transaction


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
        fields = ['user','wallet_balance','account_location','account_balance','monthly_expenses','monthly_salary','government_id','net_worth','kindness_index','happiness_index']

class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    # We reiterate what a user is once more here so that drf knows what to hyperlink (I think)
    #user = serializers.HyperlinkedRelatedField(view_name='user-detail',queryset=User.objects.all())
    class Meta:
        model = Transaction
        fields = ['depositor','beneficiary','amount','purpose']

    def validate(self, attrs):
        validation_errors = {}
        # make sure beneficiary is an existing player
        
        dep = attrs["depositor"]
        acc_bal = dep.account_balance
        if(acc_bal < attrs['amount']): 
            validation_errors["amount"] = f"Withdrawal amount {attrs['amount']} is greater than account balance {acc_bal}"
        if validation_errors:
            raise serializers.ValidationError(validation_errors)
        return attrs
        
    def create(self, validated_data):
        transaction = Transaction.objects.create(
            depositor=validated_data['depositor'],
            beneficiary=validated_data['beneficiary'],
            amount=validated_data['amount'],
            purpose=validated_data['purpose']
        )
        transaction.save() 
        

        return transaction

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
