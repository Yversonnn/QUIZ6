from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import CustomUserModel


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserModel
        fields = [
            'id',
            'email',
            'username',
            'phone_number',
            'first_name',
            'last_name',
            'location',
            'gender',
            'role',
            'merchant_id',
        ]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = CustomUserModel
        fields = [
            'email',
            'username',
            'phone_number',
            'first_name',
            'last_name',
            'location',
            'gender',
            'role',
            'merchant_id',
            'password',
        ]
        extra_kwargs = {
            'role': {'required': False},
            'merchant_id': {'required': False, 'allow_blank': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data['role'] = CustomUserModel.RoleChoices.USER
        validated_data['merchant_id'] = ''
        user = CustomUserModel(**validated_data)
        user.set_password(password)
        user.save()
        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = CustomUserModel.EMAIL_FIELD

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['username'] = user.username
        token['role'] = user.role
        token['merchant_id'] = user.merchant_id
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data