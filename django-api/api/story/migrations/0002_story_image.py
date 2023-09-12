# Generated by Django 3.2.13 on 2023-09-11 07:50

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api_story', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='story',
            name='image',
            field=cloudinary.models.CloudinaryField(default=1, max_length=255, verbose_name='image'),
            preserve_default=False,
        ),
    ]