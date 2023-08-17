# Generated by Django 4.2.4 on 2023-08-15 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0005_transaction_delete_charitytransaction'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='gender',
            field=models.CharField(choices=[('M', 'MALE'), ('F', 'FEMALE'), ('N', 'NEITHER')], default='N', max_length=1),
        ),
        migrations.AlterField(
            model_name='player',
            name='account_balance',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='player',
            name='net_worth',
            field=models.BigIntegerField(default=0),
        ),
    ]