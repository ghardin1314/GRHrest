# Generated by Django 3.0.5 on 2020-04-20 21:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='image',
            field=models.URLField(max_length=500),
        ),
    ]