# Generated by Django 5.2.4 on 2025-07-06 09:23

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email_verified', models.BooleanField(default=False)),
                ('verification_token', models.CharField(blank=True, max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True)),
                ('upload_date', models.DateTimeField(auto_now_add=True)),
                ('views', models.PositiveIntegerField(default=0)),
                ('likes', models.PositiveIntegerField(default=0)),
                ('dislikes', models.PositiveIntegerField(default=0)),
                ('uploader', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-upload_date'],
            },
        ),
    ]
