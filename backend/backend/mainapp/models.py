from django.db import models
# Create your models here.
from django.contrib.auth.models import User
from . import GAME_CONSTANTS

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,primary_key=True)
    account_location = models.CharField(max_length=3,choices = GAME_CONSTANTS.ACCOUNT_LOCATIONS,null=False)
    account_balance = models.FloatField(default=GAME_CONSTANTS.STARTING_ACCOUNT_BALANCE,null=False)
    wallet_balance = models.IntegerField(default=GAME_CONSTANTS.STARTING_WALLET_BALANCE,null=False)
    monthly_expenses = models.BigIntegerField(default=GAME_CONSTANTS.STARTING_MONTHLY_EXPENSES,null=False)
    monthly_salary = models.BigIntegerField(default=GAME_CONSTANTS.STARTING_MONTHLY_SALARY,null=False)
    government_id = models.CharField(max_length=GAME_CONSTANTS.GOVERNMENT_ID_LENGTH)
    net_worth = models.BigIntegerField(default=GAME_CONSTANTS.STARTING_NET_WORTH,null=False)
    kindness_index = models.PositiveSmallIntegerField(null=False,default=GAME_CONSTANTS.STARTING_KINDESS_INDEX)
    happiness_index = models.PositiveSmallIntegerField(null=False,default=GAME_CONSTANTS.STARTING_HAPPINESS_INDEX)
    def __str__(self):
        return f"{self.user.username} Player"
    
    @classmethod
    def get_default_entity_pk(cls):
        admin_player = cls.objects.get(
            user = User.objects.get(id=1) # Admin User Account's ID
        )
        return admin_player.pk
    
    @classmethod
    def get_deleted_entity_pk(cls):
        deleted_player = cls.objects.get(
            user = User.objects.get(username = GAME_CONSTANTS.DELETED_USER_USERNAME) # Deleted user's userid
        )
        return deleted_player.pk

class FixedDeposit(models.Model):
    principal = models.FloatField(null=False)
    interest = models.FloatField(null=False)
    term = models.IntegerField(null=False)
    start_date = models.DateField(null=False,auto_now_add=True)
    status = models.CharField(max_length=1,choices=GAME_CONSTANTS.FD_TYPES,default=GAME_CONSTANTS.DEFAULT_FD_TYPE)
    owner = models.ForeignKey(Player,on_delete=models.CASCADE)
    location =  models.CharField(max_length=3,choices = GAME_CONSTANTS.ACCOUNT_LOCATIONS)

class Asset(models.Model):
    owner = models.ForeignKey(Player,null=False,on_delete=models.SET_DEFAULT,default=Player.get_default_entity_pk)
    asset_type = models.CharField(max_length=3,choices=GAME_CONSTANTS.ASSET_TYPES,null=False)
    start_date = models.DateField(auto_now_add=True,null=False)
    buying_price = models.FloatField(null=False)
    value = models.FloatField(null=False)
    location =  models.CharField(max_length=3,choices = GAME_CONSTANTS.ACCOUNT_LOCATIONS)

class Transaction(models.Model):
    # Note : Always ensure that you pass depositor and beneficiary when a transaction is made.
    depositor = models.ForeignKey(Player,null=False,on_delete=models.SET_DEFAULT,default=Player.get_deleted_entity_pk,related_name="depositor") 
    beneficiary = models.ForeignKey(Player,null=False,on_delete=models.SET_DEFAULT,default=Player.get_deleted_entity_pk,related_name="beneficiary")
    amount = models.FloatField(null=False)
    date = models.DateField(auto_now_add=True,null=False)
    purpose = models.CharField(max_length=2,choices=GAME_CONSTANTS.TRANSACTION_PURPOSES,null=False)