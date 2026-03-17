from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import SubscriptionTier, UserSubscription
from .serializers import SubscriptionTierSerializer, UserSubscriptionSerializer


class SubscriptionTierListView(generics.ListAPIView):
    queryset = SubscriptionTier.objects.all().order_by('id')
    serializer_class = SubscriptionTierSerializer
    permission_classes = [permissions.AllowAny]


class MySubscriptionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        subscription = (
            UserSubscription.objects.select_related('tier', 'user')
            .filter(user=request.user, is_active=True)
            .order_by('-subscribed_at')
            .first()
        )

        if not subscription:
            return Response({'detail': 'No active subscription found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSubscriptionSerializer(subscription)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SubscribeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        tier_id = request.data.get('tier_id')

        if not tier_id:
            return Response({'detail': 'tier_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            tier = SubscriptionTier.objects.get(id=tier_id)
        except SubscriptionTier.DoesNotExist:
            return Response({'detail': 'Subscription tier not found.'}, status=status.HTTP_404_NOT_FOUND)

        UserSubscription.objects.filter(user=request.user, is_active=True).update(is_active=False)

        subscription = UserSubscription.objects.create(
            user=request.user,
            tier=tier,
            usage_left=tier.max_usage,
            is_active=True,
        )

        serializer = UserSubscriptionSerializer(subscription)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
