from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse


def api_root(request):
    return JsonResponse(
        {
            'message': 'Plumbing and Drain Services API is running.',
            'version': 'v1',
            'available_routes': {
                'users': '/api/v1/users/',
                'applications': '/api/v1/applications/',
                'services': '/api/v1/services/',
                'orders': '/api/v1/orders/',
                'subscription': '/api/v1/subscription/',
                'chat': '/api/v1/chat/',
                'admin': '/admin/',
            },
        }
    )


urlpatterns = [
    path('', api_root, name='api-root'),
    path('admin/', admin.site.urls),
    path('api/v1/users/', include('users.urls')),
    path('api/v1/applications/', include('applications.urls')),
    path('api/v1/services/', include('services.urls')),
    path('api/v1/orders/', include('orders.urls')),
    path('api/v1/chat/', include('chat.urls')),
    path('api/v1/subscription/', include('subscription.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)