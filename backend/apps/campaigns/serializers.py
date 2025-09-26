from __future__ import annotations

from rest_framework import serializers

from .models import AudienceSegment, Campaign, PerformanceMetric


class AudienceSegmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudienceSegment
        fields = ['id', 'name', 'description', 'persona']


class PerformanceMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformanceMetric
        fields = ['id', 'date', 'impressions', 'clicks', 'conversions', 'spend']


class CampaignSerializer(serializers.ModelSerializer):
    audiences = AudienceSegmentSerializer(many=True, required=False)
    metrics = PerformanceMetricSerializer(many=True, required=False)

    class Meta:
        model = Campaign
        fields = [
            'id',
            'name',
            'objective',
            'budget',
            'status',
            'start_date',
            'end_date',
            'created_at',
            'updated_at',
            'audiences',
            'metrics',
        ]
        read_only_fields = ['created_at', 'updated_at']

    def create(self, validated_data):
        audiences_data = validated_data.pop('audiences', [])
        metrics_data = validated_data.pop('metrics', [])
        campaign = Campaign.objects.create(**validated_data)
        self._sync_audiences(campaign, audiences_data)
        self._sync_metrics(campaign, metrics_data)
        return campaign

    def update(self, instance, validated_data):
        audiences_data = validated_data.pop('audiences', None)
        metrics_data = validated_data.pop('metrics', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if audiences_data is not None:
            self._sync_audiences(instance, audiences_data)
        if metrics_data is not None:
            self._sync_metrics(instance, metrics_data)
        return instance

    def _sync_audiences(self, campaign: Campaign, audiences_data):
        campaign.audiences.all().delete()
        for audience in audiences_data:
            AudienceSegment.objects.create(campaign=campaign, **audience)

    def _sync_metrics(self, campaign: Campaign, metrics_data):
        campaign.metrics.all().delete()
        for metric in metrics_data:
            PerformanceMetric.objects.create(campaign=campaign, **metric)
