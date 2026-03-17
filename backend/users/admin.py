from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUserModel


@admin.register(CustomUserModel)
class CustomUserAdmin(UserAdmin):
    model = CustomUserModel
    fieldsets = UserAdmin.fieldsets + (
        (
            'Additional Info',
            {
                'fields': (
                    'phone_number',
                    'location',
                    'gender',
                    'role',
                    'merchant_id',
                )
            },
        ),
    )

    list_display = (
        'id',
        'email',
        'username',
        'first_name',
        'last_name',
        'role',
        'is_staff',
    )

    search_fields = ('email', 'username', 'first_name', 'last_name')