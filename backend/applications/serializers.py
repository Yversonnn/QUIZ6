from rest_framework import serializers

from .models import SellerApplication


class SellerApplicationSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    user_id = serializers.IntegerField(source='user.id', read_only=True)

    class Meta:
        model = SellerApplication
        fields = ['id', 'user', 'user_id', 'status', 'decline_reason', 'created_at']
        read_only_fields = ['id', 'user', 'user_id', 'created_at']