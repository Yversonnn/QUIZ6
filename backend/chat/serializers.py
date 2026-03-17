from rest_framework import serializers


class ChatAskSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=1000)