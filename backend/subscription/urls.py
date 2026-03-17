from django.urls import path

from .views import MySubscriptionView, SubscribeView, SubscriptionTierListView


urlpatterns = [
    path('tiers/', SubscriptionTierListView.as_view(), name='subscription-tiers'),
    path('my/', MySubscriptionView.as_view(), name='my-subscription'),
    path('subscribe/', SubscribeView.as_view(), name='subscribe'),
]