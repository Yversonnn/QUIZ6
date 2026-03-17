from rest_framework import serializers

from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    buyer = serializers.StringRelatedField(read_only=True)
    buyer_id = serializers.IntegerField(source='buyer.id', read_only=True)
    service_name = serializers.CharField(source='service.service_name', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'buyer',
            'buyer_id',
            'service',
            'service_name',
            'paypal_transaction_id',
            'price_paid',
            'date_purchased',
        ]
        read_only_fields = ['id', 'buyer', 'buyer_id', 'service_name', 'date_purchased']