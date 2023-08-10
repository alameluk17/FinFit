from django.db import models
# Create your models here.
from django.contrib.auth.models import User
from . import GAME_CONSTANTS

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,primary_key=True)
    account_location = models.CharField(max_length=3,choices = GAME_CONSTANTS.ACCOUNT_LOCATIONS,null=False)
    account_balance = models.FloatField(default=GAME_CONSTANTS.STARTING_ACCOUNT_BALANCE,null=False)
    monthly_expenses = models.BigIntegerField(default=GAME_CONSTANTS.STARTING_MONTHLY_EXPENSES,null=False)
    monthly_salary = models.BigIntegerField(default=GAME_CONSTANTS.STARTING_MONTHLY_SALARY,null=False)
    government_id = models.CharField(max_length=12)
    net_worth = models.BigIntegerField(default=0,null=False)
    kindness_index = models.PositiveSmallIntegerField(null=False,default=GAME_CONSTANTS.STARTING_KINDESS_INDEX)

    def __str__(self):
        return f"{self.user.username} Player"
    
    @classmethod
    def get_default_entity_pk(cls):
        admin_player,_ = cls.objects.get(
            id = 1 # Admin User Account's ID
        )
        return admin_player.pk

class FixedDeposit(models.Model):
    principal = models.FloatField(null=False)
    interest = models.FloatField(null=False)
    term = models.IntegerField(null=False)
    start_date = models.DateField(null=False,auto_now_add=True)
    owner = models.ForeignKey(Player,on_delete=models.CASCADE)
    location =  models.CharField(max_length=3,choices = GAME_CONSTANTS.ACCOUNT_LOCATIONS)

class Asset(models.Model):
    owner = models.ForeignKey(Player,null=False,on_delete=models.SET_DEFAULT,default=Player.get_default_entity_pk)
    asset_type = models.CharField(max_length=3,choices=GAME_CONSTANTS.ASSET_TYPES,null=False)
    start_date = models.DateField(auto_now_add=True,null=False)
    buying_price = models.FloatField(null=False)
    value = models.FloatField(null=False)
    location =  models.CharField(max_length=3,choices = GAME_CONSTANTS.ACCOUNT_LOCATIONS)

class CharityTransaction(models.Model):
    depositor = models.ForeignKey(Player,null=False,on_delete=models.CASCADE)
    amount = models.FloatField(null=False)
    date = models.DateField(auto_now_add=True,null=False)