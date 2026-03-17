from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import SellerApplication
from .serializers import SellerApplicationSerializer


class IsAdminRole(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'Admin')


class SubmitApplicationView(generics.CreateAPIView):
    serializer_class = SellerApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        existing_pending = SellerApplication.objects.filter(user=request.user, status='Pending').exists()
        if existing_pending:
            return Response(
                {'detail': 'You already have a pending seller application.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        application = SellerApplication.objects.create(user=request.user, status='Pending')
        serializer = self.get_serializer(application)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ListApplicationView(generics.ListAPIView):
    queryset = SellerApplication.objects.select_related('user').all().order_by('-created_at')
    serializer_class = SellerApplicationSerializer
    permission_classes = [IsAdminRole]


class ApproveApplicationView(APIView):
    permission_classes = [IsAdminRole]

    def post(self, request, pk):
        try:
            application = SellerApplication.objects.select_related('user').get(pk=pk)
        except SellerApplication.DoesNotExist:
            return Response({'detail': 'Application not found.'}, status=status.HTTP_404_NOT_FOUND)

        merchant_id = request.data.get('merchant_id', '').strip()
        if not merchant_id:
            return Response({'detail': 'merchant_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

        application.status = 'Approved'
        application.decline_reason = ''
        application.save()

        user = application.user
        user.role = 'Seller'
        user.merchant_id = merchant_id
        user.save()

        serializer = SellerApplicationSerializer(application)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeclineApplicationView(APIView):
    permission_classes = [IsAdminRole]

    def post(self, request, pk):
        try:
            application = SellerApplication.objects.select_related('user').get(pk=pk)
        except SellerApplication.DoesNotExist:
            return Response({'detail': 'Application not found.'}, status=status.HTTP_404_NOT_FOUND)

        decline_reason = request.data.get('decline_reason', '').strip()
        if not decline_reason:
            return Response({'detail': 'decline_reason is required.'}, status=status.HTTP_400_BAD_REQUEST)

        application.status = 'Declined'
        application.decline_reason = decline_reason
        application.save()

        serializer = SellerApplicationSerializer(application)
        return Response(serializer.data, status=status.HTTP_200_OK)