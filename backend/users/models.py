from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUserModel(AbstractUser):
    class GenderChoices(models.TextChoices):
        MALE = 'Male', 'Male'
        FEMALE = 'Female', 'Female'
        NON_BINARY = 'Non-binary', 'Non-binary'
        PREFER_NOT_TO_SAY = 'Prefer not to say', 'Prefer not to say'

    class RoleChoices(models.TextChoices):
        ADMIN = 'Admin', 'Admin'
        SELLER = 'Seller', 'Seller'
        USER = 'User', 'User'

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    phone_number = models.CharField(max_length=20, blank=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    location = models.CharField(max_length=255, blank=True)
    gender = models.CharField(
        max_length=30,
        choices=GenderChoices.choices,
        default=GenderChoices.PREFER_NOT_TO_SAY,
    )
    role = models.CharField(
        max_length=20,
        choices=RoleChoices.choices,
        default=RoleChoices.USER,
    )
    merchant_id = models.CharField(max_length=120, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f'{self.email} ({self.role})'