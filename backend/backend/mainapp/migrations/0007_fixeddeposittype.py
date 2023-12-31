# Generated by Django 4.2.4 on 2023-08-15 11:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0006_player_gender_alter_player_account_balance_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='FixedDepositType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(choices=[('PRB', 'Private Bank'), ('PBB', 'Public Bank'), ('PO', 'Post Office')], max_length=3)),
                ('scheme_name', models.TextField()),
                ('breakable', models.BooleanField()),
                ('term', models.IntegerField()),
                ('interest_rate', models.FloatField()),
                ('tax_on_return', models.BooleanField()),
            ],
        ),
    ]
