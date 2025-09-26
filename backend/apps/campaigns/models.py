from __future__ import annotations

from django.conf import settings
from django.db import models


class Campaign(models.Model):
    DRAFT = 'draft'
    ACTIVE = 'active'
    PAUSED = 'paused'
    COMPLETED = 'completed'
    STATUS_CHOICES = [
        (DRAFT, 'Draft'),
        (ACTIVE, 'Active'),
        (PAUSED, 'Paused'),
        (COMPLETED, 'Completed'),
    ]

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='campaigns')
    name = models.CharField(max_length=255)
    objective = models.CharField(max_length=255, blank=True)
    budget = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=DRAFT)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return self.name


class AudienceSegment(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='audiences')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    persona = models.JSONField(default=dict, blank=True)

    class Meta:
        unique_together = ('campaign', 'name')

    def __str__(self) -> str:
        return f"{self.campaign.name} - {self.name}"


class PerformanceMetric(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='metrics')
    date = models.DateField()
    impressions = models.PositiveIntegerField(default=0)
    clicks = models.PositiveIntegerField(default=0)
    conversions = models.PositiveIntegerField(default=0)
    spend = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        unique_together = ('campaign', 'date')
        ordering = ['-date']

    def __str__(self) -> str:
        return f"{self.campaign.name} metrics for {self.date}"
