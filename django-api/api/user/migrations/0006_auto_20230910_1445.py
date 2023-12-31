# Generated by Django 3.2.13 on 2023-09-10 11:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api_user', '0005_auto_20230910_1123'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='chapterId',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='storyId',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='userId',
        ),
        migrations.RemoveField(
            model_name='reply',
            name='commentId',
        ),
        migrations.RemoveField(
            model_name='reply',
            name='reviewId',
        ),
        migrations.RemoveField(
            model_name='reply',
            name='userId',
        ),
        migrations.RemoveField(
            model_name='review',
            name='storyId',
        ),
        migrations.RemoveField(
            model_name='review',
            name='userId',
        ),
        migrations.RemoveField(
            model_name='story',
            name='authorId',
        ),
        migrations.RemoveField(
            model_name='story',
            name='reviews',
        ),
        migrations.DeleteModel(
            name='Chapter',
        ),
        migrations.DeleteModel(
            name='Comment',
        ),
        migrations.DeleteModel(
            name='Reply',
        ),
        migrations.DeleteModel(
            name='Review',
        ),
        migrations.DeleteModel(
            name='Story',
        ),
    ]
