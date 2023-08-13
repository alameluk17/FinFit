# Generated by Django 4.2.4 on 2023-08-13 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0003_fixeddeposit_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='happiness_index',
            field=models.PositiveSmallIntegerField(default=75),
        ),
        migrations.AddField(
            model_name='player',
            name='wallet_balance',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='player',
            name='net_worth',
            field=models.BigIntegerField(default=10000),
        ),
    ]
