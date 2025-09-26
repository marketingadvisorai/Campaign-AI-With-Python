from __future__ import annotations

from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    company = models.CharField(max_length=255, blank=True)
    job_title = models.CharField(max_length=255, blank=True)
    avatar_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['user__username']

    def __str__(self) -> str:
        return f"Profile<{self.user.username}>"
