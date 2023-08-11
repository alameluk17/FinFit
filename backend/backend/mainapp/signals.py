from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Player

@receiver(post_save,sender=User) # When a post_save signal is sent by a User object.
def create_Player(sender,instance,created, **kwargs): # Run this function. `Instance` refers to the user.
    if created:
        Player.objects.create(user=instance)
