from rest_framework import serializers

from .models import SubscriptionTier, UserSubscription


class SubscriptionTierSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionTier
        fields = ['id', 'name', 'price', 'max_usage']


class UserSubscriptionSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    tier = SubscriptionTierSerializer(read_only=True)

    class Meta:
        model = UserSubscription
        fields = ['id', 'user', 'tier', 'usage_left', 'is_active', 'subscribed_at']