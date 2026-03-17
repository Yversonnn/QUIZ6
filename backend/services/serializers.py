from rest_framework import serializers

from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    seller = serializers.StringRelatedField(read_only=True)
    seller_id = serializers.IntegerField(source='seller.id', read_only=True)

    class Meta:
        model = Service
        fields = [
            'id',
            'seller',
            'seller_id',
            'service_name',
            'description',
            'price',
            'duration_of_service',
            'sample_image',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'seller', 'seller_id', 'created_at', 'updated_at']