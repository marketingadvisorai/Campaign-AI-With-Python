from __future__ import annotations

from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import UserProfile

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'company', 'job_title', 'avatar_url', 'created_at', 'updated_at']


class UpdateUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['company', 'job_title', 'avatar_url']
