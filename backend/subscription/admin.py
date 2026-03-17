from django.contrib import admin

from .models import SubscriptionTier, UserSubscription


@admin.register(SubscriptionTier)
class SubscriptionTierAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'max_usage')


@admin.register(UserSubscription)
class UserSubscriptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'tier', 'usage_left', 'is_active', 'subscribed_at')
    list_filter = ('is_active', 'tier')
    search_fields = ('user__email', 'user__username')