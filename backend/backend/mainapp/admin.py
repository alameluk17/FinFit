from django.contrib import admin

# Register your models here.
from .models import Player,FixedDeposit,Asset,Transaction,FixedDepositType

admin.site.register(Player)
admin.site.register(FixedDeposit)
admin.site.register(Asset)
admin.site.register(Transaction)
admin.site.register(FixedDepositType)