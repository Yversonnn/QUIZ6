from rest_framework import generics, permissions

from .models import Service
from .serializers import ServiceSerializer


class IsSellerOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role in ('Seller', 'Admin')
        )


class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.select_related('seller').all().order_by('-created_at')
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]


class ServiceDetailView(generics.RetrieveAPIView):
    queryset = Service.objects.select_related('seller').all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]


class SellerServiceManageView(generics.ListCreateAPIView):
    serializer_class = ServiceSerializer
    permission_classes = [IsSellerOrAdmin]

    def get_queryset(self):
        if self.request.user.role == 'Admin':
            return Service.objects.select_related('seller').all().order_by('-created_at')
        return Service.objects.select_related('seller').filter(seller=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)


class SellerServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ServiceSerializer
    permission_classes = [IsSellerOrAdmin]

    def get_queryset(self):
        if self.request.user.role == 'Admin':
            return Service.objects.select_related('seller').all()
        return Service.objects.select_related('seller').filter(seller=self.request.user)