from django.contrib import admin

from .models import AudienceSegment, Campaign, PerformanceMetric


class AudienceSegmentInline(admin.TabularInline):
    model = AudienceSegment
    extra = 0


class PerformanceMetricInline(admin.TabularInline):
    model = PerformanceMetric
    extra = 0


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'status', 'budget', 'start_date', 'end_date')
    list_filter = ('status', 'start_date', 'end_date')
    search_fields = ('name', 'objective', 'owner__username')
    inlines = [AudienceSegmentInline, PerformanceMetricInline]


@admin.register(AudienceSegment)
class AudienceSegmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'campaign', 'description')
    search_fields = ('name', 'campaign__name')


@admin.register(PerformanceMetric)
class PerformanceMetricAdmin(admin.ModelAdmin):
    list_display = ('campaign', 'date', 'impressions', 'clicks', 'conversions', 'spend')
    list_filter = ('date',)
