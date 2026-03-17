from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from subscription.models import UserSubscription

from .serializers import ChatAskSerializer


class AIChatbotView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ChatAskSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        subscription = (
            UserSubscription.objects.select_related('tier')
            .filter(user=request.user, is_active=True)
            .order_by('-subscribed_at')
            .first()
        )

        if not subscription:
            return Response(
                {'detail': 'Active subscription is required to use chatbot.'},
                status=status.HTTP_402_PAYMENT_REQUIRED,
            )

        if subscription.usage_left <= 0:
            subscription.is_active = False
            subscription.save(update_fields=['is_active'])
            return Response(
                {'detail': 'Chatbot usage limit reached. Please subscribe again.'},
                status=status.HTTP_402_PAYMENT_REQUIRED,
            )

        subscription.usage_left -= 1
        subscription.save(update_fields=['usage_left'])

        question = serializer.validated_data['message'].lower()

        if 'service' in question or 'plumbing' in question or 'drain' in question:
            answer = 'This platform provides plumbing and drain services with service listings, seller applications, and booking/payment workflows.'
        elif 'seller' in question or 'application' in question:
            answer = 'Users can submit seller applications. Admin can approve or decline applications and assign merchant IDs on approval.'
        elif 'paypal' in question or 'payment' in question:
            answer = 'Payments are logged with PayPal transaction references and linked to services and buyers.'
        else:
            answer = 'I answer project-related questions about this Plumbing and Drain Services platform only.'

        return Response(
            {
                'question': serializer.validated_data['message'],
                'answer': answer,
                'subscription_tier': subscription.tier.name,
                'usage_left': subscription.usage_left,
            },
            status=status.HTTP_200_OK,
        )