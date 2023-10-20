from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Player, Transaction

@receiver(post_save,sender=User) # When a post_save signal is sent by a User object.
def create_Player(sender,instance,created, **kwargs): # Run this function. `Instance` refers to the user.
    if created:
        Player.objects.create(user=instance)

@receiver(post_save,sender=Transaction)
def Transfer_Money(sender,instance,created,**kwargs):
    if created:
        dep = instance.depositor
        ben = instance.beneficiary
        amount = instance.amount
        dep.account_balance = dep.account_balance - amount
        ben.account_balance = ben.account_balance + amount
        dep.save()
        ben.save()